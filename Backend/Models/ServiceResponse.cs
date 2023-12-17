using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class ServiceResponse
    {
        public bool Success { get; set; } = true;
        public object Data { get; set; }
        public int ErrorCode { get; set; } = 0;
        public List<Error> Errors { get; set; }
        public DateTimeOffset ServerTime { get; set; } = DateTimeOffset.Now;
    }
}
