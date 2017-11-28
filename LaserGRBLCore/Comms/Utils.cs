using System;
using System.Collections.Generic;

namespace LaserGRBLCore.Comms
{
    public static class Utils
    {
        public static List<string> GetComPorts(){
            var ret = new List<string>();
            var allPorts = System.IO.Ports.SerialPort.GetPortNames();
            foreach(var portname in allPorts){
                var finalPortName = portname;
                if(!char.IsDigit(finalPortName[finalPortName.Length -1])){
                    finalPortName = finalPortName.Substring(0, finalPortName.Length - 1);
                }
                ret.Add(finalPortName);
            }
            return ret;
        }

        public static List<int> BaudRates => new List<int> { 4800, 9600, 19200, 38400, 57600, 115200, 230400 };
    }
}
