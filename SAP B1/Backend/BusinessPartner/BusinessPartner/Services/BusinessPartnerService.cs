using System.Data;
using Microsoft.Data.SqlClient;
using BusinessPartner.Models;

namespace BusinessPartner.Services
{
    public class BusinessPartnerService
    {
        private readonly string _connectionString;

        public BusinessPartnerService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public List<Models.BusinessPartner> GetAllBusinessPartners()
        {
            List<Models.BusinessPartner> list = new();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllBusinessPartners", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Models.BusinessPartner
                            {
                                CardCode = reader["CardCode"].ToString(),
                                CardName = reader["CardName"].ToString(),
                                CardType = reader["CardType"].ToString(),
                                Phone1 = reader["Phone1"].ToString(),
                                E_Mail = reader["E_Mail"].ToString(),
                                Balance = reader["Balance"] != DBNull.Value ? Convert.ToDecimal(reader["Balance"]) : 0
                            });
                        }
                    }
                }
            }

            return list;
        }
    }
}