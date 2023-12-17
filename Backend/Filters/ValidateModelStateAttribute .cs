using Backend.Enum;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Net;

namespace Backend.Filters
{
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var res = new ServiceResponse();
                res.Success = false;
                res.ErrorCode = (int)EnumErrorCode.ModelInvalid;
                res.Errors = context.ModelState.Keys
               .Where(key => context.ModelState[key].Errors.Count > 0)
               .Select(key => new Error
               {
                   Field = key,
                   Errors = context.ModelState[key].Errors.Select(error => error.ErrorMessage).ToList()
               })
               .ToList();

                context.Result = new JsonResult(res)
                {
                    StatusCode = (int)HttpStatusCode.BadRequest
                };
            }
        }
    }
}
