using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LaserGRBLCoreAPI.Controllers
{
    [Route("api/[controller]")]
    public class CommsController : Controller
    {
        [HttpPost("commands")]
        public LaserGRBLCore.GrblCommand EnqueueCommand([FromBody] string commandText){
            var command = new LaserGRBLCore.GrblCommand(commandText);
            LaserGRBLCore.Comms.Manager.EnqueueCommad(command);
            return command;
        }

        [HttpGet("commands")]
        public object GetCommands(){
            return new
            {
                Sent = LaserGRBLCore.Comms.Manager.MainComms.GetSentCommands(),
                Pending = LaserGRBLCore.Comms.Manager.MainComms.GetPendingCommands(),
                Queued = LaserGRBLCore.Comms.Manager.MainComms.GetQueuedCommands()
            };
        }

        [HttpGet("maincomm")]
        public LaserGRBLCore.GrblCore GetMainComm(){
            return LaserGRBLCore.Comms.Manager.MainComms;
        }
    }
}
