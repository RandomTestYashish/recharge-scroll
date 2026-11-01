const imgEllipse18997 = "https://www.figma.com/api/mcp/asset/c161f73b-c2a9-4bf9-aa2a-6af53f7540d0.svg";
const imgCheckCircle = "https://www.figma.com/api/mcp/asset/5283d8c2-974e-40e2-b69f-be3227b60580.svg";
const imgBattery = "https://www.figma.com/api/mcp/asset/e739b458-d152-44fe-a749-6278962cd1d4.svg";
const imgWifi = "https://www.figma.com/api/mcp/asset/7d1df4c8-ea14-4f6e-b067-9463d08fd398.svg";
const imgCellularConnection = "https://www.figma.com/api/mcp/asset/f66195d0-efe4-43d8-b9ef-603c615939bb.svg";
const img941 = "https://www.figma.com/api/mcp/asset/a2988edf-0949-4f57-9ba2-c145a3f1ef36.svg";

type TickProps = {
  className?: string;
  property1?: "Tick 1";
};

function Tick({ className, property1 = "Tick 1" }: TickProps) {
  return (
    <div className={className || "h-[814px] overflow-clip relative rounded-[20px] w-[375px]"} data-node-id="81554:153880">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[170px] top-1/2" data-node-id="81554:153881">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse18997} />
      </div>
      <div className="-translate-x-1/2 absolute bottom-[45.25%] left-[calc(50%+1px)] rounded-[37.5px] top-[45.5%] w-[75px]" data-node-id="81554:153882" style={{ backgroundImage: "linear-gradient(-5.182726133771553deg, rgb(1, 101, 40) 2.3538%, rgb(1, 198, 77) 97.569%)" }} />
      <div className="absolute contents left-[139px] top-[357px]" data-node-id="81554:153883">
        <div className="absolute left-[139px] size-[98px] top-[357px]" data-node-id="81554:153884" data-name="CheckCircle">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheckCircle} />
        </div>
      </div>
    </div>
  );
}

export default function RechargeSuccessAnimation() {
  return (
    <div className="bg-[#f5f6fa] relative size-full" data-node-id="81554:163091" data-name="Recharge Success Animation">
      <div className="absolute h-[44px] left-0 top-0 w-[375px]" data-node-id="81554:163092" data-name="Status-Bar/App">
        <div className="absolute h-[44px] left-0 top-0 w-[375px]" data-node-id="I81554:163092;4446:43147" />
        <div className="absolute inset-[39.39%_5.42%_34.85%_88.09%]" data-node-id="I81554:163092;4446:42610" data-name="Battery">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
        </div>
        <div className="absolute inset-[39.39%_13.24%_35.61%_82.67%]" data-node-id="I81554:163092;4446:42614" data-name="Wifi">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWifi} />
        </div>
        <div className="absolute inset-[40.15%_18.67%_35.61%_76.8%]" data-node-id="I81554:163092;4446:42618" data-name="Cellular Connection">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCellularConnection} />
        </div>
        <div className="absolute inset-[27.27%_81.33%_27.27%_5.33%]" data-node-id="I81554:163092;4446:42623" data-name="Time Style">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11.089px] left-[calc(50%-10.79px)] top-[calc(50%-0.46px)] w-[28.426px]" data-node-id="I81554:163092;8859:19288" data-name="9:41">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={img941} />
          </div>
        </div>
      </div>
      <Tick className="-translate-x-1/2 -translate-y-1/2 absolute h-[814px] left-1/2 overflow-clip rounded-[20px] top-1/2 w-[375px]" />
    </div>
  );
}
