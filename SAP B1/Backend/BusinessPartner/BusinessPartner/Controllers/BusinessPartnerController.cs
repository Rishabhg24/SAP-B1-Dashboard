using Microsoft.AspNetCore.Mvc;
using BusinessPartner.Services;

namespace BusinessPartner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessPartnerController : ControllerBase
    {
        private readonly BusinessPartnerService _service;

        public BusinessPartnerController(BusinessPartnerService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _service.GetAllBusinessPartners();

            return Ok(result);
        }
       

    }
}