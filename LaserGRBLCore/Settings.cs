using System;
using static LaserGRBLCore.GrblCore;

namespace LaserGRBLCore
{
    public class Settings
    {
        public GrblCore.ThreadingMode ThreadingMode = GrblCore.ThreadingMode.UltraFast;
        public GrblConf GrblConf = new GrblConf();
        public Version Version = new Version(0,1);
        public bool SupportHardwarePWM = true;
        public bool UniDirectionalEngraving = false;
        public string LastOpenFile = null;
        public StreamingMode StreamingMode = StreamingMode.Buffered;
    }

    public static class SettingsManager
    {
        public static Settings Shared => new Settings();

        public static void Save(){
            throw new NotImplementedException();
        }
    }
}
