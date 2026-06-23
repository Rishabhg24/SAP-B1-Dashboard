using Microsoft.AspNetCore.Mvc;
using BusinessPartner.Services;

namespace BusinessPartner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly PurchaseOrderService _service;

        public PurchaseOrderController(PurchaseOrderService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _service.GetPurchaseOrders();

            return Ok(result);
        }
    }
}