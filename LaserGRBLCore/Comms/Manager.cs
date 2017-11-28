using System;
namespace LaserGRBLCore.Comms
{
    public static class Manager
    {
        public static LaserGRBLCore.GrblCore MainComms = null;

        static Manager()
        {
            MainComms = new LaserGRBLCore.GrblCore();
        }

        public static void EnqueueCommad(GrblCommand cmd){
            MainComms.EnqueueCommand(cmd);
        }
    }
}
