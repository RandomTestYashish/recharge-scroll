const imgLiveContainer = "https://www.figma.com/api/mcp/asset/c564f6cd-7fdd-4927-9877-131227fbb935.svg";
const imgTypeCardDividerModeSingleLine = "https://www.figma.com/api/mcp/asset/efb663a5-5ee2-4bde-8f57-61b543570604.svg";
const imgLiveContainer1 = "https://www.figma.com/api/mcp/asset/e6e6462a-2fcb-46f5-9ac8-7e6cd3872742.svg";
const imgRectangle2 = "https://www.figma.com/api/mcp/asset/ffe46458-37e3-47b2-a600-ea434d37fa58.png";
const imgAirtelSpamShield2 = "https://www.figma.com/api/mcp/asset/fc080f7d-e5d7-4989-91ad-c434c9391887.png";
const imgMWebOttLogosHellotunes = "https://www.figma.com/api/mcp/asset/72319219-2203-41a8-a533-7f72ec7edaa3.png";
const imgRectangle161123993 = "https://www.figma.com/api/mcp/asset/28f0adcd-1db0-4908-929b-677ccf432600.png";
const imgRectangle161124092 = "https://www.figma.com/api/mcp/asset/31455547-6972-46d3-908c-1a8633e0f3c3.png";
const imgImage1970 = "https://www.figma.com/api/mcp/asset/93c5d961-55be-4166-9d32-b32135373d82.png";
const imgRectangle161124096 = "https://www.figma.com/api/mcp/asset/bff21d56-f014-415c-9db0-343dc3762f00.png";
const imgImage1961 = "https://www.figma.com/api/mcp/asset/9d8401b5-4a22-4330-877f-d86f6e6bb6dd.png";
const imgVector = "https://www.figma.com/api/mcp/asset/045adfd5-6816-4839-b72b-594dc06f0092.svg";
const imgRectangle = "https://www.figma.com/api/mcp/asset/c35e35d7-dd94-4300-a4d0-000f0c5cea31.svg";
const imgRectangle1 = "https://www.figma.com/api/mcp/asset/6e890a71-2c4e-4f28-ba30-6135ec3ebad1.svg";
const imgAirtelSpamShield1 = "https://www.figma.com/api/mcp/asset/92045247-f302-4426-be6f-b92c004ad090.svg";
const imgVector1 = "https://www.figma.com/api/mcp/asset/14a2219a-afe3-4136-9e0a-449ec207ce1c.svg";
const imgVector2 = "https://www.figma.com/api/mcp/asset/4301505e-01a6-402d-a784-66c1d24ea80b.svg";
const imgVector56 = "https://www.figma.com/api/mcp/asset/64079e96-0e1c-40a5-bcb8-7ce9910553db.svg";
const imgVector55 = "https://www.figma.com/api/mcp/asset/d9a4363c-19e0-43df-b1ee-f0226523cd9a.svg";
const imgVector54 = "https://www.figma.com/api/mcp/asset/b94f4fe9-e1f1-4c8d-8e2a-120a97dd93b4.svg";
const imgVector52 = "https://www.figma.com/api/mcp/asset/bf1f6164-53c0-4927-a012-2ba869ca5cf2.svg";
const imgVector53 = "https://www.figma.com/api/mcp/asset/5e6b399e-32df-475f-bc6a-d3b2addb277d.svg";
const imgVector3 = "https://www.figma.com/api/mcp/asset/7f842c49-9f19-4dcd-ae7c-08fb858da843.svg";
const imgBack = "https://www.figma.com/api/mcp/asset/38fe8493-72b2-4873-878f-a8c647cbba7c.svg";
const imgLeftAnkle = "https://www.figma.com/api/mcp/asset/9437f4f4-133f-41de-8c2e-118b05414eec.svg";
const imgRightAnkle = "https://www.figma.com/api/mcp/asset/407fad39-86aa-49af-86a7-50a0b289052d.svg";
const imgGroup1597881672 = "https://www.figma.com/api/mcp/asset/0add697e-1be8-4ba8-a3c9-ad0d02fe7018.svg";
const imgCellSignalFull = "https://www.figma.com/api/mcp/asset/dbea1b6f-b3a1-412a-a7a3-b77d62c10278.svg";
const imgAirplaneTilt = "https://www.figma.com/api/mcp/asset/dfb2be36-e84a-48c1-925a-6aa6cf547e01.svg";
const imgLiveContainer2 = "https://www.figma.com/api/mcp/asset/94c4a835-a904-42f9-9089-7afc02f4c12d.svg";
const imgBattery = "https://www.figma.com/api/mcp/asset/dfd0e390-fce8-4a62-9550-bb90e05e71bf.svg";
const imgWifi = "https://www.figma.com/api/mcp/asset/deb3bff2-33b7-48bb-b0d1-2cd3fabb8daa.svg";
const imgCellularConnection = "https://www.figma.com/api/mcp/asset/d082fb9a-c1b2-4577-9e57-1dd1df329b0d.svg";
const img941 = "https://www.figma.com/api/mcp/asset/26018ad0-2d16-45c4-a22a-cfec44a06d69.svg";

function OutlineDownChevron({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-node-id="418:36812" data-name="Outline/Down Chevron">
      <div className="absolute inset-[8.33%]" data-node-id="418:36813" data-name="Live-container">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLiveContainer} />
      </div>
    </div>
  );
}

type DividerProps = {
  className?: string;
  mode?: "Single Line";
  type?: "Card-divider";
};

function Divider({ className, mode = "Single Line", type = "Card-divider" }: DividerProps) {
  return (
    <div className={className || "h-0 relative w-[343px]"} data-node-id="81538:9980">
      <div className="absolute inset-[-1px_0_0_0]">
        <img alt="" className="block max-w-none size-full" src={imgTypeCardDividerModeSingleLine} />
      </div>
    </div>
  );
}

function OutlineRightChevron({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="1243:4038" data-name="Outline/Right Chevron">
      <div className="absolute inset-[8.33%]" data-node-id="1243:4039" data-name="Live-container">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLiveContainer1} />
      </div>
    </div>
  );
}

export default function Prepaid() {
  return (
    <div className="bg-white relative size-full" data-node-id="81554:163094" data-name="Prepaid">
      <div className="-translate-x-1/2 absolute h-[276.478px] left-[calc(50%-0.5px)] rounded-bl-[20px] rounded-br-[20px] shadow-[var(--shadow\/level2\/x,0px)_var(--shadow\/level2\/y,4px)_var(--shadow\/level2\/blur,8px)_0px_rgba(186,186,186,0.4)] top-0 w-[375px]" data-node-id="81554:163095" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 375 276.48' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.1481e-15 13.824 -18.75 8.4647e-16 187.5 138.24)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(238,245,251,1)' offset='1'/></radialGradient></defs></svg>\")" }} />
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%-1px)] top-[371px] w-[343px]" data-node-id="81554:163096">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="81554:163097" data-name="plans">
          <div className="bg-[var(--color\/surface\/default,white)] border border-[var(--color\/border\/secondary\/default,#e6e9ef)] border-solid content-stretch drop-shadow-[0px_4px_6.5px_rgba(133,140,143,0.1)] flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[343px]" data-node-id="81554:163098">
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="81554:163099">
              <div className="content-stretch flex items-start relative shrink-0" data-node-id="81554:163100">
                <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0" data-node-id="81554:163101" data-name="Info Tag ✅">
                  <div className="bg-[var(--info_tag\/color\/surface\/default\/default,#e6e9ef)] border-[length:var(--info_tag\/stroke,1px)] border-[var(--info_tag\/color\/border\/default,#8e9aa9)] border-solid content-stretch flex h-[20px] items-center overflow-clip px-[var(--info_tag\/spacing\/inset\/horizontal\/compact,8px)] relative rounded-[var(--info_tag\/radius\/in-card\/md,8px)] shrink-0" data-node-id="I81554:163101;17928:3717" data-name="More Properties">
                    <div className="content-stretch flex gap-[var(--info_tag\/spacing\/inline,4px)] items-center relative shrink-0" data-node-id="I81554:163101;17928:3718" data-name="text">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--info_tag\/color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xxxs,11px)] text-center tracking-[var(--typography\/letter_spacing\/body\/xxs,0px)] whitespace-nowrap" data-node-id="I81554:163101;17928:3720" style={{ fontFeatureSettings: '"liga" 0' }}>
                        <p className="leading-[var(--typography\/line-height\/xxxs,12px)]">Popular Pack</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-node-id="81554:163102">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163103">
                  <div className="flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] min-w-full relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/lg,20px)] w-[min-content]" data-node-id="81554:163104" style={{ fontFeatureSettings: '"liga" 0' }}>
                    <p className="leading-[var(--typography\/line-height\/lg,22px)]">₹199</p>
                  </div>
                  <p className="font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163105" style={{ fontFeatureSettings: '"liga" 0' }}>
                    Unlimited calls
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[60px]" data-node-id="81554:163106" data-name="Key Pair ✅">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163107" data-name="Key pair + Right element">
                    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163108" data-name="Main Body">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163109" data-name="Text Body">
                        <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163110" data-name="Value unit">
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163111" data-name="Value unit + old price">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] whitespace-nowrap" data-node-id="81554:163112" style={{ fontFeatureSettings: '"liga" 0' }}>
                              2 GB
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163115" data-name="Key Unit">
                          <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163116" data-name="Key Unit">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163117" style={{ fontFeatureSettings: '"liga" 0' }}>
                              Data
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[75px]" data-node-id="81554:163122" data-name="Key Pair ✅">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163123" data-name="Key pair + Right element">
                    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163124" data-name="Main Body">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163125" data-name="Text Body">
                        <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163126" data-name="Value unit">
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163127" data-name="Value unit + old price">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] whitespace-nowrap" data-node-id="81554:163128" style={{ fontFeatureSettings: '"liga" 0' }}>
                              28 days
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163131" data-name="Key Unit">
                          <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163132" data-name="Key Unit">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163133" style={{ fontFeatureSettings: '"liga" 0' }}>
                              Validity
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <OutlineRightChevron className="relative shrink-0 size-[24px]" />
              </div>
            </div>
            <Divider className="h-0 relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="81554:163140">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="81554:163141">
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163142" data-name="Logo/Adobe Express">
                  <div className="-translate-y-1/2 absolute aspect-[23.990108489990234/23.990108489990234] left-0 right-0 top-1/2" data-node-id="I81554:163142;23955:930" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                  <div className="absolute contents inset-[16.61%_16.67%]" data-node-id="I81554:163142;23955:953" data-name="Adobe A">
                    <div className="absolute contents inset-[16.61%_16.67%]" data-node-id="I81554:163142;23955:954" data-name="Clip path group">
                      <div className="absolute contents inset-[5.12%_5.18%]" data-node-id="I81554:163142;23955:957" data-name="Group">
                        <div className="absolute contents inset-[5.12%_5.18%]" data-node-id="I81554:163142;23955:958" data-name="Clip path group">
                          <div className="absolute contents inset-[4.98%_4.61%_4.57%_4.95%]" data-node-id="I81554:163142;23955:961" data-name="Group">
                            <div className="absolute inset-[4.98%_4.61%_4.57%_4.95%] mask-position-[2.812px_2.79px,_0.056px_0.032px] mask-size-[16px_16.029px,_21.513px_21.544px]" data-node-id="I81554:163142;23955:962" style={{ maskImage: `url("${imgRectangle}"), url("${imgRectangle1}")` }} data-name="Rectangle">
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle2} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163143" data-name="Logo/Airtel SPAM Shield">
                  <div className="absolute inset-[-1.73%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.415px] mask-size-[24px_24px]" data-node-id="I81554:163143;20814:6500" style={{ maskImage: `url("${imgAirtelSpamShield1}")` }} data-name="airtel_spam_shield 1">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[100.74%] left-[-2.11%] max-w-none top-[-0.74%] w-[104.23%]" src={imgAirtelSpamShield2} />
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163144" data-name="Logo/HelloTunes">
                  <div className="-translate-y-1/2 absolute aspect-[23.990108489990234/23.990108489990234] left-0 right-0 top-1/2" data-node-id="I81554:163144;22309:1237" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                  </div>
                  <div className="absolute inset-[8.33%] rounded-[5.333px]" data-node-id="I81554:163144;22309:1240" data-name="M-web-OTT logos/Hellotunes">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5.333px]">
                      <img alt="" className="absolute left-[12.1%] max-w-none size-[75.03%] top-[12.5%]" src={imgMWebOttLogosHellotunes} />
                    </div>
                  </div>
                </div>
                <div className="border-[#d4d5d6] border-[0.5px] border-solid overflow-clip relative rounded-[4px] shrink-0 size-[32px]" data-node-id="81554:163145" data-name="More">
                  <div className="absolute bottom-[-0.5px] left-[-0.5px] size-[36px]" data-node-id="81554:163146" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                  <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[16px] left-[5.5px] not-italic text-[#075ee8] text-[14px] top-[calc(50%-8px)] tracking-[0.1172px] uppercase whitespace-nowrap" data-node-id="81554:163147" style={{ fontFeatureSettings: '"liga" 0' }}>
                    +1
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-b border-[length:var(--button\/stroke,1px)] border-[var(--button\/color\/border\/secondary\/default,#3e4146)] border-solid content-stretch flex from-[var(--button\/color\/surface\/secondary\/default_start,white)] gap-[var(--button\/spacing\/inline\/standard,4px)] h-[40px] items-center justify-center px-[var(--size\/inline\/md,24px)] relative rounded-[var(--button\/radius\/standard\/sm,12px)] shrink-0 to-[var(--button\/color\/surface\/secondary\/default_stop,#f5f5f5)]" data-node-id="81554:163148" data-name="Button ✅">
                <div className="content-stretch flex gap-[var(--button\/spacing\/inline\/standard,4px)] items-center relative shrink-0" data-node-id="I81554:163148;14636:14799" data-name="Main Body">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:500')] font-[var(--typography\/weight\/medium,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--button\/color\/text\/secondary\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] text-center whitespace-nowrap" data-node-id="I81554:163148;14636:14801" style={{ fontFeatureSettings: '"liga" 0' }}>
                    <p className="leading-[var(--typography\/line-height\/xs,16px)]">Buy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color\/surface\/default,white)] border border-[var(--color\/border\/secondary\/default,#e6e9ef)] border-solid content-stretch flex flex-col items-center overflow-clip relative rounded-[16px] shadow-[0px_4px_13px_5px_rgba(133,140,143,0.1)] shrink-0 w-[343px]" data-node-id="81554:163149">
            <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative shrink-0 w-[343px]" data-node-id="81554:163150">
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="81554:163151">
                <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0" data-node-id="81554:163152" data-name="Info Tag ✅">
                  <div className="bg-gradient-to-b border-[length:var(--info_tag\/stroke,1px)] border-[var(--info_tag\/color\/border\/highlighted,#9cbff6)] border-solid content-stretch flex from-[12.5%] from-[var(--info_tag\/color\/surface\/highlighted\/start,#e8fbff)] h-[20px] items-center overflow-clip px-[var(--info_tag\/spacing\/inset\/horizontal\/compact,8px)] relative rounded-[var(--info_tag\/radius\/in-card\/md,8px)] shrink-0 to-[var(--info_tag\/color\/surface\/highlighted\/stop,#e8fbff)] via-[43.75%] via-[var(--info_tag\/color\/surface\/highlighted\/mid,#f0f2f9)]" data-node-id="I81554:163152;17928:3737" data-name="More Properties">
                    <div className="content-stretch flex gap-[var(--info_tag\/spacing\/inline,4px)] items-center relative shrink-0" data-node-id="I81554:163152;17928:3738" data-name="text">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--info_tag\/color\/text\/highlighted,#075ee8)] text-[length:var(--typography\/size\/xxxs,11px)] text-center tracking-[var(--typography\/letter_spacing\/body\/xxs,0px)] whitespace-nowrap" data-node-id="I81554:163152;17928:3740" style={{ fontFeatureSettings: '"liga" 0' }}>
                        <p className="leading-[var(--typography\/line-height\/xxxs,12px)]">Exclusive Cricket Pack</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-node-id="81554:163153">
                  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] min-w-px relative text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/lg,20px)]" data-node-id="81554:163154" style={{ fontFeatureSettings: '"liga" 0' }}>
                    <p className="leading-[var(--typography\/line-height\/lg,22px)]">₹100</p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[60px]" data-node-id="81554:163155" data-name="Key Pair ✅">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163156" data-name="Key pair + Right element">
                      <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163157" data-name="Main Body">
                        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163158" data-name="Text Body">
                          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163159" data-name="Value unit">
                            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163160" data-name="Value unit + old price">
                              <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] whitespace-nowrap" data-node-id="81554:163161" style={{ fontFeatureSettings: '"liga" 0' }}>
                                6 GB
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163164" data-name="Key Unit">
                            <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163165" data-name="Key Unit">
                              <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163166" style={{ fontFeatureSettings: '"liga" 0' }}>
                                Data
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[75px]" data-node-id="81554:163171" data-name="Key Pair ✅">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163172" data-name="Key pair + Right element">
                      <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163173" data-name="Main Body">
                        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163174" data-name="Text Body">
                          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163175" data-name="Value unit">
                            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163176" data-name="Value unit + old price">
                              <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] whitespace-nowrap" data-node-id="81554:163177" style={{ fontFeatureSettings: '"liga" 0' }}>
                                30 days
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163180" data-name="Key Unit">
                            <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163181" data-name="Key Unit">
                              <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163182" style={{ fontFeatureSettings: '"liga" 0' }}>
                                Validity
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <OutlineRightChevron className="relative shrink-0 size-[24px]" />
                </div>
              </div>
              <Divider className="h-0 relative shrink-0 w-full" />
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="81554:163189">
                <div className="content-stretch flex items-center relative shrink-0" data-node-id="81554:163190">
                  <div className="relative rounded-[4px] shrink-0 size-[32px]" data-node-id="81554:163191">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgRectangle161123993} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] gap-[22px] items-center min-w-px pl-[16px] relative" data-node-id="81554:163192">
                  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-px not-italic relative text-[#44484f] text-[12px]" data-node-id="81554:163193">
                    <p className="leading-[14px]">JioHotstar mobile for 1 month</p>
                  </div>
                  <div className="bg-gradient-to-t content-stretch flex from-[var(--button\/color\/surface\/primary\/default_start,black)] gap-[var(--button\/spacing\/inset\/horizontal,12px)] h-[40px] items-center justify-center px-[var(--size\/inline\/md,24px)] relative rounded-[var(--button\/radius\/standard\/sm,12px)] shrink-0 to-[var(--button\/color\/surface\/primary\/default_stop,#2d2b2b)]" data-node-id="81554:163194" data-name="Button ✅">
                    <div className="content-stretch flex gap-[var(--button\/spacing\/inline\/standard,4px)] items-center relative shrink-0" data-node-id="I81554:163194;14636:12730" data-name="Main Body">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:500')] font-[var(--typography\/weight\/medium,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--button\/color\/text\/primary\/default,white)] text-[length:var(--typography\/size\/xs,14px)] text-center whitespace-nowrap" data-node-id="I81554:163194;14636:12732" style={{ fontFeatureSettings: '"liga" 0' }}>
                        <p className="leading-[var(--typography\/line-height\/xs,16px)]">Buy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r border-[var(--color\/surface\/success\/light,#d1efdc)] border-solid border-t content-stretch flex from-[#effff2] h-[36px] items-start justify-center px-[16px] py-[8px] relative rounded-bl-[14px] rounded-br-[14px] shrink-0 to-[#edfaf2] via-[#f9f5f0] via-[49.924%] w-full" data-node-id="81554:163195" data-name="Bottom ticker">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[18px] min-w-px not-italic relative text-[12px] text-black text-center" data-node-id="81554:163196">
                JioHotstar Mobile for a month
              </p>
            </div>
          </div>
          <div className="bg-[var(--color\/surface\/default,white)] border border-[var(--color\/border\/secondary\/default,#e6e9ef)] border-solid content-stretch drop-shadow-[0px_4px_6.5px_rgba(133,140,143,0.1)] flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[343px]" data-node-id="81554:163197">
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="81554:163198">
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-node-id="81554:163199">
                <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0" data-node-id="81554:163200" data-name="Info Tag ✅">
                  <div className="bg-[var(--info_tag\/color\/surface\/default\/default,#e6e9ef)] border-[length:var(--info_tag\/stroke,1px)] border-[var(--info_tag\/color\/border\/default,#8e9aa9)] border-solid content-stretch flex h-[20px] items-center overflow-clip px-[var(--info_tag\/spacing\/inset\/horizontal\/compact,8px)] relative rounded-[var(--info_tag\/radius\/in-card\/md,8px)] shrink-0" data-node-id="I81554:163200;17928:3717" data-name="More Properties">
                    <div className="content-stretch flex gap-[var(--info_tag\/spacing\/inline,4px)] items-center relative shrink-0" data-node-id="I81554:163200;17928:3718" data-name="text">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--info_tag\/color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xxxs,11px)] text-center tracking-[var(--typography\/letter_spacing\/body\/xxs,0px)] whitespace-nowrap" data-node-id="I81554:163200;17928:3720" style={{ fontFeatureSettings: '"liga" 0' }}>
                        <p className="leading-[var(--typography\/line-height\/xxxs,12px)]">OTT Plan</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[20px] items-start justify-center relative shrink-0" data-node-id="81554:163201" data-name="Info Tag ✅">
                  <div className="bg-[var(--info_tag\/color\/surface\/default\/default,#e6e9ef)] border-[length:var(--info_tag\/stroke,1px)] border-[var(--info_tag\/color\/border\/default,#8e9aa9)] border-solid content-stretch flex h-[20px] items-center overflow-clip px-[var(--info_tag\/spacing\/inset\/horizontal\/compact,8px)] relative rounded-[var(--info_tag\/radius\/in-card\/md,8px)] shrink-0" data-node-id="I81554:163201;17928:3717" data-name="More Properties">
                    <div className="content-stretch flex gap-[var(--info_tag\/spacing\/inline,4px)] items-center relative shrink-0" data-node-id="I81554:163201;17928:3718" data-name="text">
                      <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--info_tag\/color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xxxs,11px)] text-center tracking-[var(--typography\/letter_spacing\/body\/xxs,0px)] whitespace-nowrap" data-node-id="I81554:163201;17928:3720" style={{ fontFeatureSettings: '"liga" 0' }}>
                        <p className="leading-[var(--typography\/line-height\/xxxs,12px)]">Data Heavy Pack</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-node-id="81554:163202">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163203">
                  <div className="flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] min-w-full relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/lg,20px)] w-[min-content]" data-node-id="81554:163204" style={{ fontFeatureSettings: '"liga" 0' }}>
                    <p className="leading-[var(--typography\/line-height\/lg,22px)]">₹349</p>
                  </div>
                  <p className="font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163205" style={{ fontFeatureSettings: '"liga" 0' }}>
                    Unlimited calls
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[60px]" data-node-id="81554:163206" data-name="Key Pair ✅">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163207" data-name="Key pair + Right element">
                    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163208" data-name="Main Body">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163209" data-name="Text Body">
                        <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163210" data-name="Value unit">
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163211" data-name="Value unit + old price">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] whitespace-nowrap" data-node-id="81554:163212" style={{ fontFeatureSettings: '"liga" 0' }}>
                              2 GB
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163215" data-name="Key Unit">
                          <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163216" data-name="Key Unit">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163217" style={{ fontFeatureSettings: '"liga" 0' }}>
                              Per day
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[75px]" data-node-id="81554:163222" data-name="Key Pair ✅">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163223" data-name="Key pair + Right element">
                    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163224" data-name="Main Body">
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163225" data-name="Text Body">
                        <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163226" data-name="Value unit">
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163227" data-name="Value unit + old price">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] whitespace-nowrap" data-node-id="81554:163228" style={{ fontFeatureSettings: '"liga" 0' }}>
                              28 days
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163231" data-name="Key Unit">
                          <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163232" data-name="Key Unit">
                            <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163233" style={{ fontFeatureSettings: '"liga" 0' }}>
                              Validity
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <OutlineRightChevron className="relative shrink-0 size-[24px]" />
              </div>
            </div>
            <Divider className="h-0 relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="81554:163240">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="81554:163241">
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163242" data-name="Logo/Adobe Express">
                  <div className="-translate-y-1/2 absolute aspect-[23.990108489990234/23.990108489990234] left-0 right-0 top-1/2" data-node-id="I81554:163242;23955:930" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                  <div className="absolute contents inset-[16.61%_16.67%]" data-node-id="I81554:163242;23955:953" data-name="Adobe A">
                    <div className="absolute contents inset-[16.61%_16.67%]" data-node-id="I81554:163242;23955:954" data-name="Clip path group">
                      <div className="absolute contents inset-[5.12%_5.18%]" data-node-id="I81554:163242;23955:957" data-name="Group">
                        <div className="absolute contents inset-[5.12%_5.18%]" data-node-id="I81554:163242;23955:958" data-name="Clip path group">
                          <div className="absolute contents inset-[4.98%_4.61%_4.57%_4.95%]" data-node-id="I81554:163242;23955:961" data-name="Group">
                            <div className="absolute inset-[4.98%_4.61%_4.57%_4.95%] mask-position-[2.812px_2.79px,_0.056px_0.032px] mask-size-[16px_16.029px,_21.513px_21.544px]" data-node-id="I81554:163242;23955:962" style={{ maskImage: `url("${imgRectangle}"), url("${imgRectangle1}")` }} data-name="Rectangle">
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle2} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163243" data-name="Logo/Airtel SPAM Shield">
                  <div className="absolute inset-[-1.73%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.415px] mask-size-[24px_24px]" data-node-id="I81554:163243;20814:6500" style={{ maskImage: `url("${imgAirtelSpamShield1}")` }} data-name="airtel_spam_shield 1">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[100.74%] left-[-2.11%] max-w-none top-[-0.74%] w-[104.23%]" src={imgAirtelSpamShield2} />
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163244" data-name="Logo/HelloTunes">
                  <div className="-translate-y-1/2 absolute aspect-[23.990108489990234/23.990108489990234] left-0 right-0 top-1/2" data-node-id="I81554:163244;22309:1237" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                  </div>
                  <div className="absolute inset-[8.33%] rounded-[5.333px]" data-node-id="I81554:163244;22309:1240" data-name="M-web-OTT logos/Hellotunes">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5.333px]">
                      <img alt="" className="absolute left-[12.1%] max-w-none size-[75.03%] top-[12.5%]" src={imgMWebOttLogosHellotunes} />
                    </div>
                  </div>
                </div>
                <div className="border-[#d4d5d6] border-[0.5px] border-solid overflow-clip relative rounded-[4px] shrink-0 size-[32px]" data-node-id="81554:163245" data-name="More">
                  <div className="absolute bottom-[-0.5px] left-[-0.5px] size-[36px]" data-node-id="81554:163246" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                  <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[16px] left-[5.5px] not-italic text-[#075ee8] text-[14px] top-[calc(50%-8px)] tracking-[0.1172px] uppercase whitespace-nowrap" data-node-id="81554:163247" style={{ fontFeatureSettings: '"liga" 0' }}>
                    +1
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-b border-[length:var(--button\/stroke,1px)] border-[var(--button\/color\/border\/secondary\/default,#3e4146)] border-solid content-stretch flex from-[var(--button\/color\/surface\/secondary\/default_start,white)] gap-[var(--button\/spacing\/inline\/standard,4px)] h-[40px] items-center justify-center px-[var(--size\/inline\/md,24px)] relative rounded-[var(--button\/radius\/standard\/sm,12px)] shrink-0 to-[var(--button\/color\/surface\/secondary\/default_stop,#f5f5f5)]" data-node-id="81554:163248" data-name="Button ✅">
                <div className="content-stretch flex gap-[var(--button\/spacing\/inline\/standard,4px)] items-center relative shrink-0" data-node-id="I81554:163248;14636:14799" data-name="Main Body">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:500')] font-[var(--typography\/weight\/medium,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--button\/color\/text\/secondary\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] text-center whitespace-nowrap" data-node-id="I81554:163248;14636:14801" style={{ fontFeatureSettings: '"liga" 0' }}>
                    <p className="leading-[var(--typography\/line-height\/xs,16px)]">Buy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap" data-node-id="81554:163249">
            All packs
          </p>
          <div className="bg-[var(--color\/surface\/default,white)] border border-[var(--color\/border\/secondary\/default,#e6e9ef)] border-solid content-stretch drop-shadow-[0px_4px_6.5px_rgba(133,140,143,0.1)] flex flex-col gap-[16px] items-start p-[16px] relative rounded-[16px] shrink-0 w-[343px]" data-node-id="81554:163250">
            <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-node-id="81554:163251">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163252">
                <div className="flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] justify-center leading-[0] min-w-full relative shrink-0 text-[color:var(--color\/text\/default,#292c31)] text-[length:var(--typography\/size\/lg,20px)] w-[min-content]" data-node-id="81554:163253" style={{ fontFeatureSettings: '"liga" 0' }}>
                  <p className="leading-[var(--typography\/line-height\/lg,22px)]">₹489</p>
                </div>
                <p className="font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163254" style={{ fontFeatureSettings: '"liga" 0' }}>
                  Unlimited calls
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[60px]" data-node-id="81554:163255" data-name="Key Pair ✅">
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163256" data-name="Key pair + Right element">
                  <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163257" data-name="Main Body">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163258" data-name="Text Body">
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163259" data-name="Value unit">
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163260" data-name="Value unit + old price">
                          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color\/text\/default,#292c31)] whitespace-nowrap" data-node-id="81554:163261" style={{ fontFeatureSettings: '"liga" 0' }}>
                            6 GB
                          </p>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163264" data-name="Key Unit">
                        <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163265" data-name="Key Unit">
                          <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163266" style={{ fontFeatureSettings: '"liga" 0' }}>
                            Data
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[75px]" data-node-id="81554:163271" data-name="Key Pair ✅">
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="81554:163272" data-name="Key pair + Right element">
                  <div className="content-stretch flex gap-[4px] items-end relative shrink-0 w-full" data-node-id="81554:163273" data-name="Main Body">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="81554:163274" data-name="Text Body">
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="81554:163275" data-name="Value unit">
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="81554:163276" data-name="Value unit + old price">
                          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--color\/text\/default,#292c31)] whitespace-nowrap" data-node-id="81554:163277" style={{ fontFeatureSettings: '"liga" 0' }}>
                            77 days
                          </p>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="81554:163280" data-name="Key Unit">
                        <div className="content-stretch flex items-center py-px relative shrink-0" data-node-id="81554:163281" data-name="Key Unit">
                          <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:400')] font-[var(--typography\/weight\/regular,normal)] leading-[var(--typography\/line-height\/xxs,14px)] relative shrink-0 text-[color:var(--color\/text\/caption,#696b6f)] text-[length:var(--typography\/size\/xxs,12px)] whitespace-nowrap" data-node-id="81554:163282" style={{ fontFeatureSettings: '"liga" 0' }}>
                            Validity
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <OutlineRightChevron className="relative shrink-0 size-[24px]" />
            </div>
            <Divider className="h-0 relative shrink-0 w-full" />
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="81554:163289">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="81554:163290">
                <div className="bg-[#d40000] relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163291" data-name="Logo/Xstream-play">
                  <div className="absolute inset-0 overflow-clip rounded-[3.368px]" data-node-id="I81554:163291;13745:5383" style={{ backgroundImage: "linear-gradient(184.28915326878806deg, rgb(33, 33, 33) 30.737%, rgb(0, 0, 0) 96.512%)" }} data-name="Xstream Play icon">
                    <div className="-translate-x-1/2 absolute bottom-[0.19%] left-1/2 top-[-0.19%] w-[31.999px]" data-node-id="I81554:163291;13745:5384" style={{ backgroundImage: "linear-gradient(135.26899143992284deg, rgb(0, 0, 0) 1.7377%, rgb(218, 0, 1) 102.21%)" }} />
                    <div className="-translate-x-1/2 absolute bottom-[0.19%] left-1/2 top-[-0.19%] w-[31.999px]" data-node-id="I81554:163291;13745:5385" style={{ backgroundImage: "linear-gradient(135.26899143992284deg, rgb(0, 0, 0) 1.7377%, rgb(218, 0, 1) 102.21%)" }} />
                    <div className="absolute inset-[4.17%_0_0_0]" data-node-id="I81554:163291;13745:5386">
                      <div className="absolute inset-[-11.37%_-9.34%_-8.12%_-9.34%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector56} />
                      </div>
                    </div>
                    <div className="absolute inset-[17.9%_0_0.39%_0]" data-node-id="I81554:163291;13745:5387">
                      <div className="absolute inset-[-13.34%_-9.34%_-9.53%_-9.34%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector55} />
                      </div>
                    </div>
                    <div className="absolute inset-[33.85%_0_-7.78%_0]" data-node-id="I81554:163291;13745:5388">
                      <div className="absolute inset-[-8.42%_-4.67%_-4.21%_-4.67%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector54} />
                      </div>
                    </div>
                    <div className="absolute inset-[53.31%_0_-27.24%_0]" data-node-id="I81554:163291;13745:5389">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector52} />
                    </div>
                    <div className="absolute inset-[70.83%_0_0_0]" data-node-id="I81554:163291;13745:5390">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector53} />
                    </div>
                    <div className="[word-break:break-word] absolute bg-clip-text capitalize flex flex-col font-['Airtel_Sans:Semi_Bold'] inset-[51.67%_12.5%_33.87%_12.5%] justify-center leading-[0] not-italic text-[5.89px] text-[transparent] text-center tracking-[0.0441px]" data-node-id="I81554:163291;13745:5359" style={{ backgroundImage: "linear-gradient(179.99999999999994deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 28.271%, rgb(219, 219, 219) 73.61%, rgb(171, 170, 170) 118%)" }}>
                      <p className="leading-none">Xstream</p>
                    </div>
                    <div className="[word-break:break-word] absolute bg-clip-text capitalize flex flex-col font-['Airtel_Sans:Semi_Bold'] inset-[66.67%_29.17%_12.5%_29.17%] justify-center leading-[0] not-italic text-[6.12px] text-[transparent] text-center text-shadow-[0px_0.118px_6.357px_rgba(0,0,0,0.49)] tracking-[0.0441px]" data-node-id="I81554:163291;13745:5360" style={{ backgroundImage: "linear-gradient(178.0474758125369deg, rgb(255, 255, 255) 3.1915%, rgb(255, 255, 255) 22.192%, rgb(219, 219, 219) 52.664%, rgb(171, 170, 170) 82.498%)" }}>
                      <p className="leading-none">Play</p>
                    </div>
                    <div className="absolute inset-[12.5%_31.37%_52.2%_33.33%]" data-node-id="I81554:163291;13745:5361" data-name="Vector">
                      <div className="absolute inset-[-1.04%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector3} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163292" data-name="Logo/Adobe Express">
                  <div className="-translate-y-1/2 absolute aspect-[23.990108489990234/23.990108489990234] left-0 right-0 top-1/2" data-node-id="I81554:163292;23955:930" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                  </div>
                  <div className="absolute contents inset-[16.61%_16.67%]" data-node-id="I81554:163292;23955:953" data-name="Adobe A">
                    <div className="absolute contents inset-[16.61%_16.67%]" data-node-id="I81554:163292;23955:954" data-name="Clip path group">
                      <div className="absolute contents inset-[5.12%_5.18%]" data-node-id="I81554:163292;23955:957" data-name="Group">
                        <div className="absolute contents inset-[5.12%_5.18%]" data-node-id="I81554:163292;23955:958" data-name="Clip path group">
                          <div className="absolute contents inset-[4.98%_4.61%_4.57%_4.95%]" data-node-id="I81554:163292;23955:961" data-name="Group">
                            <div className="absolute inset-[4.98%_4.61%_4.57%_4.95%] mask-position-[2.812px_2.79px,_0.056px_0.032px] mask-size-[16px_16.029px,_21.513px_21.544px]" data-node-id="I81554:163292;23955:962" style={{ maskImage: `url("${imgRectangle}"), url("${imgRectangle1}")` }} data-name="Rectangle">
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle2} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[5.333px] shrink-0 size-[32px]" data-node-id="81554:163293" data-name="Logo/Airtel SPAM Shield">
                  <div className="absolute inset-[-1.73%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0.415px] mask-size-[24px_24px]" data-node-id="I81554:163293;20814:6500" style={{ maskImage: `url("${imgAirtelSpamShield1}")` }} data-name="airtel_spam_shield 1">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[100.74%] left-[-2.11%] max-w-none top-[-0.74%] w-[104.23%]" src={imgAirtelSpamShield2} />
                    </div>
                  </div>
                </div>
                <div className="border-[#d4d5d6] border-[0.5px] border-solid overflow-clip relative rounded-[4px] shrink-0 size-[32px]" data-node-id="81554:163294" data-name="More">
                  <div className="absolute bottom-[-0.5px] left-[-0.5px] size-[36px]" data-node-id="81554:163295" data-name="Vector">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                  </div>
                  <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[16px] left-[5.5px] not-italic text-[#075ee8] text-[14px] top-[calc(50%-8px)] tracking-[0.1172px] uppercase whitespace-nowrap" data-node-id="81554:163296" style={{ fontFeatureSettings: '"liga" 0' }}>
                    +1
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-b border-[length:var(--button\/stroke,1px)] border-[var(--button\/color\/border\/secondary\/default,#3e4146)] border-solid content-stretch flex from-[var(--button\/color\/surface\/secondary\/default_start,white)] gap-[var(--button\/spacing\/inline\/standard,4px)] h-[40px] items-center justify-center px-[var(--size\/inline\/md,24px)] relative rounded-[var(--button\/radius\/standard\/sm,12px)] shrink-0 to-[var(--button\/color\/surface\/secondary\/default_stop,#f5f5f5)]" data-node-id="81554:163297" data-name="Button ✅">
                <div className="content-stretch flex gap-[var(--button\/spacing\/inline\/standard,4px)] items-center relative shrink-0" data-node-id="I81554:163297;14636:14799" data-name="Main Body">
                  <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:500')] font-[var(--typography\/weight\/medium,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--button\/color\/text\/secondary\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] text-center whitespace-nowrap" data-node-id="I81554:163297;14636:14801" style={{ fontFeatureSettings: '"liga" 0' }}>
                    <p className="leading-[var(--typography\/line-height\/xs,16px)]">Buy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[1129px] left-[-2px] top-0 w-[375px]" data-node-id="81554:163299" data-name="image 1869" />
      <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[16px] left-[388px] not-italic text-[#374150] text-[14px] top-[343.23px] whitespace-nowrap" data-node-id="81554:163300" style={{ fontFeatureSettings: '"liga" 0' }}>
        Maxx data
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[16px] left-[473px] not-italic text-[#374150] text-[12px] top-[343.23px] whitespace-nowrap" data-node-id="81554:163301" style={{ fontFeatureSettings: '"liga" 0' }}>
        Monthly packs
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[15px] not-italic text-[16px] text-black top-[336px] whitespace-nowrap" data-node-id="81554:163302">
        Other packs for you
      </p>
      <div className="absolute content-stretch flex flex-col items-start left-[-1px] top-[1168px] w-[375px]" data-node-id="81554:163303">
        <div className="content-stretch flex flex-col h-[64px] items-start justify-center px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="81554:163304" style={{ backgroundImage: "linear-gradient(181.5634617026348deg, var(--rs-color-on-background-critical,rgb(240, 244, 249)) 6.2999%, var(--rs-color-on-background-critical,rgb(255, 255, 255)) 92.512%)" }}>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="81554:163305">
            <div className="relative shrink-0 size-[40px]" data-node-id="81554:163306">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-[-18%] max-w-none size-[136%] top-[-18%]" src={imgRectangle161124092} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/body-to-append,8px)] items-start justify-end min-w-px relative" data-node-id="81554:163307" data-name="✅ Section Title">
              <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/prepend-to-body,4px)] items-start min-w-px relative" data-node-id="I81554:163307;247:72579" data-name="Prepend & Body">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--section-title\/spacing\/stack,4px)] items-start justify-center min-w-px relative" data-node-id="I81554:163307;247:72581" data-name="Body">
                  <div className="content-stretch flex gap-[var(--section-title\/spacing\/inline\/in-body,4px)] items-center relative shrink-0" data-node-id="I81554:163307;247:72582" data-name="Title & info icon">
                    <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/sm,18px)] relative shrink-0 text-[color:var(--section-title\/color\/text\/title\/bold,#292c31)] text-[length:var(--typography\/size\/sm,16px)] whitespace-nowrap" data-node-id="I81554:163307;247:72583" style={{ fontFeatureSettings: '"liga" 0' }}>
                      Top Data Packs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <OutlineDownChevron className="overflow-clip relative shrink-0 size-[24px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-col h-[64px] items-start justify-center px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="81554:163309" style={{ backgroundImage: "linear-gradient(181.5634617026348deg, var(--rs-color-on-background-critical,rgb(240, 244, 249)) 6.2999%, var(--rs-color-on-background-critical,rgb(255, 255, 255)) 92.512%)" }}>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="81554:163310">
            <div className="relative shrink-0 size-[40px]" data-node-id="81554:163311" data-name="image 1970">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1970} />
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/body-to-append,8px)] items-start justify-end min-w-px relative" data-node-id="81554:163312" data-name="✅ Section Title">
              <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/prepend-to-body,4px)] items-start min-w-px relative" data-node-id="I81554:163312;247:72579" data-name="Prepend & Body">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--section-title\/spacing\/stack,4px)] items-start justify-center min-w-px relative" data-node-id="I81554:163312;247:72581" data-name="Body">
                  <div className="content-stretch flex gap-[var(--section-title\/spacing\/inline\/in-body,4px)] items-center relative shrink-0" data-node-id="I81554:163312;247:72582" data-name="Title & info icon">
                    <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/sm,18px)] relative shrink-0 text-[color:var(--section-title\/color\/text\/title\/bold,#292c31)] text-[length:var(--typography\/size\/sm,16px)] whitespace-nowrap" data-node-id="I81554:163312;247:72583" style={{ fontFeatureSettings: '"liga" 0' }}>
                      International roaming
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <OutlineDownChevron className="overflow-clip relative shrink-0 size-[24px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-col h-[64px] items-start justify-center px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="81554:163314" style={{ backgroundImage: "linear-gradient(181.5634617026348deg, var(--rs-color-on-background-critical,rgb(240, 244, 249)) 6.2999%, var(--rs-color-on-background-critical,rgb(255, 255, 255)) 92.512%)" }}>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="81554:163315">
            <div className="relative shrink-0 size-[40px]" data-node-id="81554:163316">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle161124096} />
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/body-to-append,8px)] items-start justify-end min-w-px relative" data-node-id="81554:163317" data-name="✅ Section Title">
              <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/prepend-to-body,4px)] items-start min-w-px relative" data-node-id="I81554:163317;247:72579" data-name="Prepend & Body">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--section-title\/spacing\/stack,4px)] items-start justify-center min-w-px relative" data-node-id="I81554:163317;247:72581" data-name="Body">
                  <div className="content-stretch flex gap-[var(--section-title\/spacing\/inline\/in-body,4px)] items-center relative shrink-0" data-node-id="I81554:163317;247:72582" data-name="Title & info icon">
                    <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/sm,18px)] relative shrink-0 text-[color:var(--section-title\/color\/text\/title\/bold,#292c31)] text-[length:var(--typography\/size\/sm,16px)] whitespace-nowrap" data-node-id="I81554:163317;247:72583" style={{ fontFeatureSettings: '"liga" 0' }}>
                      OTT Packs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <OutlineDownChevron className="overflow-clip relative shrink-0 size-[24px]" />
          </div>
        </div>
        <div className="content-stretch flex flex-col h-[64px] items-start justify-center px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="81554:163319" style={{ backgroundImage: "linear-gradient(181.5634617026348deg, var(--rs-color-on-background-critical,rgb(240, 244, 249)) 6.2999%, var(--rs-color-on-background-critical,rgb(255, 255, 255)) 92.512%)" }}>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="81554:163320">
            <div className="relative shrink-0 size-[40px]" data-node-id="81554:163321" data-name="image 1961">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[128.54%] left-[-28.28%] max-w-none top-[-14.16%] w-[154.25%]" src={imgImage1961} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/body-to-append,8px)] items-start justify-end min-w-px relative" data-node-id="81554:163322" data-name="✅ Section Title">
              <div className="content-stretch flex flex-[1_0_0] gap-[var(--section-title\/spacing\/inline\/prepend-to-body,4px)] items-start min-w-px relative" data-node-id="I81554:163322;247:72579" data-name="Prepend & Body">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--section-title\/spacing\/stack,4px)] items-start justify-center min-w-px relative" data-node-id="I81554:163322;247:72581" data-name="Body">
                  <div className="content-stretch flex gap-[var(--section-title\/spacing\/inline\/in-body,4px)] items-center relative shrink-0" data-node-id="I81554:163322;247:72582" data-name="Title & info icon">
                    <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/weight\/bold,normal)] leading-[var(--typography\/line-height\/sm,18px)] relative shrink-0 text-[color:var(--section-title\/color\/text\/title\/bold,#292c31)] text-[length:var(--typography\/size\/sm,16px)] whitespace-nowrap" data-node-id="I81554:163322;247:72583" style={{ fontFeatureSettings: '"liga" 0' }}>
                      Cricket Packs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <OutlineDownChevron className="overflow-clip relative shrink-0 size-[24px]" />
          </div>
        </div>
      </div>
      <a className="absolute block cursor-pointer left-[15.5px] size-[40px] top-[77.5px]" data-node-id="81554:163324" data-name="Back">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBack} />
      </a>
      <div className="[word-break:break-word] absolute contents leading-[0] left-[136px] not-italic text-center top-[77px] whitespace-nowrap" data-node-id="81554:163328" data-name="name">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Extra_Bold'] font-extrabold justify-center left-[187.5px] text-[16px] text-black top-[86px] tracking-[0.64px]" data-node-id="81554:163329">
          <p className="leading-[18px]">Harshit</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Regular'] font-normal justify-center left-[187px] text-[12px] text-[rgba(1,39,82,0.8)] top-[109px] tracking-[0.24px]" data-node-id="81554:163330">
          <p className="leading-[18px]">+91 9864309723</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col isolate items-center left-[calc(50%-1.5px)] top-[149px] w-[343px]" data-node-id="81554:163331">
        <div className="content-stretch flex flex-col items-start mb-[-12px] relative shrink-0 z-[2]" data-node-id="81554:163332" data-name="Clip Tag ✅">
          <div className="content-stretch flex h-[16px] items-center relative shrink-0" data-node-id="I81554:163332;16135:234" data-name="Main Body">
            <div className="relative shrink-0 size-[16px]" data-node-id="I81554:163332;16135:235" data-name="Left Ankle">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLeftAnkle} />
            </div>
            <div className="bg-gradient-to-t content-stretch flex from-[var(--clip_tag\/color\/surface\/body\/type5\/start,black)] gap-[var(--clip_tag\/spacing\/inline,4px)] h-[16px] items-center justify-center px-[var(--clip_tag\/spacing\/inset\/compact\/horizontal,2px)] py-[var(--clip_tag\/spacing\/inset\/compact\/vertical,2px)] relative shrink-0 to-[var(--clip_tag\/color\/surface\/body\/type5\/stop,#2d2b2b)]" data-node-id="I81554:163332;16135:238" data-name="Text">
              <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:700')] font-[var(--typography\/style\/italic\/bold,normal)] leading-[var(--typography\/line-height\/xxxs,12px)] relative shrink-0 text-[color:var(--clip_tag\/color\/text\/dynamic,white)] text-[length:var(--typography\/size\/xxxs,11px)] text-center whitespace-nowrap" data-node-id="I81554:163332;16135:240" style={{ fontFeatureSettings: '"liga" 0' }}>
                Last recharge
              </p>
            </div>
            <div className="relative shrink-0 size-[16px]" data-node-id="I81554:163332;16135:241" data-name="Right Ankle">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRightAnkle} />
            </div>
          </div>
        </div>
        <div className="bg-[var(--color\/surface\/default,white)] border border-[var(--color\/border\/secondary\/default,#e6e9ef)] border-solid content-stretch drop-shadow-[0px_4px_6.5px_rgba(133,140,143,0.1)] flex gap-[68px] items-center pb-[16px] pt-[24px] px-[16px] relative rounded-[16px] shrink-0 w-[343px] z-[1]" data-node-id="81554:163333">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-node-id="81554:163334">
            <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center relative shrink-0 text-[20px] text-[color:var(--color\/text\/default,#292c31)]" data-node-id="81554:163335" style={{ fontFeatureSettings: '"liga" 0' }}>
              <p className="leading-[normal]">₹199</p>
            </div>
            <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--color\/text\/secondary\/default,#485b76)]" data-node-id="81554:163336" style={{ fontFeatureSettings: '"liga" 0' }}>
              <p className="leading-[normal]">1.5 GB/day • 28 days</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#075ee8] text-[12px]" data-node-id="81554:163337" style={{ fontFeatureSettings: '"liga" 0' }}>
              <p className="leading-[normal]">Pack Details</p>
            </div>
          </div>
          <div className="bg-gradient-to-b border-[length:var(--button\/stroke,1px)] border-[var(--button\/color\/border\/secondary\/default,#3e4146)] border-solid content-stretch flex from-[var(--button\/color\/surface\/secondary\/default_start,white)] gap-[var(--button\/spacing\/inline\/standard,4px)] h-[40px] items-center justify-center px-[var(--size\/inline\/md,24px)] relative rounded-[var(--button\/radius\/standard\/sm,12px)] shrink-0 to-[var(--button\/color\/surface\/secondary\/default_stop,#f5f5f5)] w-[124px]" data-node-id="81554:163338" data-name="Button ✅">
            <div className="content-stretch flex gap-[var(--button\/spacing\/inline\/standard,4px)] items-center relative shrink-0" data-node-id="I81554:163338;14636:12730" data-name="Main Body">
              <div className="[word-break:break-word] flex flex-col font-[family-name:var(--typography\/font\/family,'Inter:500')] font-[var(--typography\/weight\/medium,normal)] justify-center leading-[0] relative shrink-0 text-[color:var(--color\/surface\/default_inverse,black)] text-[length:var(--typography\/size\/xs,14px)] text-center tracking-[var(--typography\/letter_spacing\/body\/sm,0px)] whitespace-nowrap" data-node-id="I81554:163338;14636:12732" style={{ fontFeatureSettings: '"liga" 0' }}>
                <p className="leading-[var(--typography\/line-height\/xs,16px)]">Recharge ₹299</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-[299.49px]" data-node-id="81554:163339" data-name="xsxscddx">
        <div className="absolute h-[9.013px] left-[113.91px] top-[299.49px] w-[148.186px]" data-node-id="81554:163340">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1597881672} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border border-[rgba(220,229,240,0.8)] border-solid bottom-0 drop-shadow-[0px_4px_6.5px_rgba(133,140,143,0.1)] h-[97px] left-[calc(50%+0.5px)] w-[375px]" data-node-id="81554:163358">
        <div className="absolute contents left-[15px] top-[14px]" data-node-id="81554:163359">
          <div className="absolute contents left-[104.94px] top-[15.24px]" data-node-id="81554:163360">
            <div className="absolute bg-white border border-[rgba(220,229,240,0.8)] border-solid h-[38px] left-[104.94px] rounded-[8px] top-[15.24px] w-[140px]" data-node-id="81554:163361" />
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[16px] left-[133.57px] not-italic text-[#374150] text-[14px] top-[26.24px] whitespace-nowrap" data-node-id="81554:163362" style={{ fontFeatureSettings: '"liga" 0' }}>
              Top data packs
            </p>
            <div className="absolute left-[113.14px] size-[16px] top-[26.24px]" data-node-id="81554:163363" data-name="CellSignalFull">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCellSignalFull} />
            </div>
          </div>
          <div className="absolute contents left-[256.94px] top-[15.24px]" data-node-id="81554:163365">
            <div className="absolute bg-white border border-[rgba(220,229,240,0.8)] border-solid h-[38px] left-[256.94px] rounded-[8px] top-[15.24px] w-[179px]" data-node-id="81554:163366" />
            <div className="absolute left-[264.94px] size-[16px] top-[26.24px]" data-node-id="81554:163367" data-name="AirplaneTilt">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgAirplaneTilt} />
            </div>
            <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[16px] left-[284.94px] not-italic text-[#374150] text-[14px] top-[26.24px] whitespace-nowrap" data-node-id="81554:163369" style={{ fontFeatureSettings: '"liga" 0' }}>
              International roaming
            </p>
          </div>
          <div className="absolute bg-[var(--button\/color\/surface\/alt_black\/default,rgba(255,255,255,0))] content-stretch flex h-[38px] items-center justify-center left-[16px] top-[15px]" data-node-id="81554:163370" data-name="Button ✅">
            <div className="bg-[var(--button\/color\/surface\/alt_black\/default,rgba(255,255,255,0))] border-[length:var(--button\/stroke,1px)] border-[var(--button\/color\/border\/alt_black\/default,black)] border-solid content-stretch flex gap-[4px] h-[38px] items-center justify-center px-[var(--button\/spacing\/inset\/horizontal,12px)] relative rounded-[var(--button\/radius\/alternate,8px)] shrink-0" data-node-id="81554:163371" data-name="label--primary">
              <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="81554:163372" data-name="Outline/Manage Plan">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-1/2 size-[15px] top-1/2" data-node-id="I81554:163372;17725:2955">
                  <div className="-scale-y-100 flex-none">
                    <div className="relative size-[15px]" data-name="Live-container">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLiveContainer2} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-[family-name:var(--typography\/font\/family,'Inter:medium')] font-[var(--typography\/weight\/medium,normal)] leading-[var(--typography\/line-height\/xs,16px)] relative shrink-0 text-[color:var(--button\/color\/text\/alt_black\/default,#292c31)] text-[length:var(--typography\/size\/xs,14px)] text-center tracking-[var(--typography\/letter_spacing\/body\/sm,0px)] whitespace-nowrap" data-node-id="81554:163373" style={{ fontFeatureSettings: '"liga" 0' }}>
                Filter
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[44px] left-[calc(50%-1px)] top-0 w-[375px]" data-node-id="81554:163374" data-name="Status Bar/iPhone 11–Light">
        <div className="absolute h-[44px] left-0 top-0 w-[375px]" data-node-id="I81554:163374;4446:43147" />
        <div className="absolute inset-[39.39%_5.42%_34.85%_88.09%]" data-node-id="I81554:163374;4446:42610" data-name="Battery">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBattery} />
        </div>
        <div className="absolute inset-[39.39%_13.24%_35.61%_82.67%]" data-node-id="I81554:163374;4446:42614" data-name="Wifi">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWifi} />
        </div>
        <div className="absolute inset-[40.15%_18.67%_35.61%_76.8%]" data-node-id="I81554:163374;4446:42618" data-name="Cellular Connection">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCellularConnection} />
        </div>
        <div className="absolute inset-[27.27%_81.33%_27.27%_5.33%]" data-node-id="I81554:163374;4446:42623" data-name="Time Style">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11.089px] left-[calc(50%-10.79px)] top-[calc(50%-0.46px)] w-[28.426px]" data-node-id="I81554:163374;8859:19288" data-name="9:41">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={img941} />
          </div>
        </div>
      </div>
    </div>
  );
}
