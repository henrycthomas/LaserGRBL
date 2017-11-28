using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LaserGRBLCoreAPI.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        #region Enumerables

        [HttpGet("enums/baudrates")]
        public IEnumerable<int> GetBaudRates()
        {
            return LaserGRBLCore.Comms.Utils.BaudRates;
        }

        [HttpGet("enums/comports")]
        public IEnumerable<string> GetComPorts()
        {
            return LaserGRBLCore.Comms.Utils.GetComPorts();
        }

        #endregion


       
      
    }
}
