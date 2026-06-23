namespace BusinessPartner.Models
{
    public class PurchaseOrderLine
    {
        public string ItemCode { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public string TaxCode { get; set; }
    }
}