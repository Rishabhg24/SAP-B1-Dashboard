using System.Data;
using Microsoft.Data.SqlClient;
using BusinessPartner.Models;

namespace BusinessPartner.Services
{
    public class PurchaseOrderService
    {
        private readonly string _connectionString;

        public PurchaseOrderService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public List<PurchaseOrder> GetPurchaseOrders()
        {
            List<PurchaseOrder> list = new();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand("GetPurchaseOrders", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                conn.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int docEntry = Convert.ToInt32(reader["DocEntry"]);

                        // check if header already exists
                        var existingPO = list.FirstOrDefault(x => x.DocEntry == docEntry);

                        if (existingPO == null)
                        {
                            existingPO = new PurchaseOrder
                            {
                                DocEntry = docEntry,
                                CardCode = reader["CardCode"].ToString(),
                                CardName = reader["CardName"].ToString(),
                                DocDate = Convert.ToDateTime(reader["DocDate"]),
                                DocTotal = Convert.ToDecimal(reader["DocTotal"])
                            };

                            list.Add(existingPO);
                        }

                        // add line item
                        existingPO.Items.Add(new PurchaseOrderLine
                        {
                            ItemCode = reader["ItemCode"].ToString(),
                            Quantity = Convert.ToDecimal(reader["Quantity"]),
                            UnitPrice = Convert.ToDecimal(reader["UnitPrice"]),
                            Discount = Convert.ToDecimal(reader["Discount"]),
                            TaxCode = reader["TaxCode"].ToString()
                        });
                    }
                }
            }

            return list;
        }
    }
}