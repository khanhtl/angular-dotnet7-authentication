using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public async Task<ServiceResponse> Get()
        {
            var employees = new List<Employee>
            {
                new Employee { Id = 1, City = "Hà Nội", Email = "employee1@example.com", Name = "Employee One", Phone = "0123456789"},
                new Employee { Id = 2, City = "Hà Nội", Email = "employee2@example.com", Name = "Employee Two", Phone = "0123456788"},
                new Employee { Id = 3, City = "Hà Nội", Email = "employee3@example.com", Name = "Employee Three", Phone = "0123456787"},
                new Employee { Id = 4, City = "Hà Nội", Email = "employee4@example.com", Name = "Employee Four", Phone = "0123456786"},
            };
            return new ServiceResponse(employees);
        }
    }
}
