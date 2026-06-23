namespace BusinessPartner.Models
{
    public class PurchaseOrder
    {
        public int DocEntry { get; set; }
        public string CardCode { get; set; }
        public string CardName { get; set; }
        public DateTime DocDate { get; set; }
        public decimal DocTotal { get; set; }
        public List<PurchaseOrderLine> Items { get; set; } = new();
    }
}