import InpBase from './InpBase';

export default class InpTitle extends InpBase {
  constructor(protected file: string) {
    super(file)
  }

  export() {
    this.addText(`
    [TAGS]

    [DEMANDS]
    ;Junction        	Demand      	Pattern         	Category

    [STATUS]
    ;ID              	Status/Setting

    [PATTERNS]
    ;ID              	Multipliers

    [CONTROLS]

    [RULES]

    [ENERGY]
    Global Efficiency  	75
    Global Price       	0
    Demand Charge      	0

    [EMITTERS]
    ;Junction        	Coefficient

    [QUALITY]
    ;Node            	InitQual

    [SOURCES]
    ;Node            	Type        	Quality     	Pattern

    [REACTIONS]
    ;Type     	Pipe/Tank       	Coefficient


    [REACTIONS]
    Order Bulk            	1
    Order Tank            	1
    Order Wall            	1
    Global Bulk           	0
    Global Wall           	0
    Limiting Potential    	0
    Roughness Correlation 	0

    [MIXING]
    ;Tank            	Model

    [TIMES]
    Duration           	0
    Hydraulic Timestep 	1:00
    Quality Timestep   	0:05
    Pattern Timestep   	1:00
    Pattern Start      	0:00
    Report Timestep    	1:00
    Report Start       	0:00
    Start ClockTime    	12 am
    Statistic          	None

    [REPORT]
    Status             	No
    Summary            	No
    Page               	0

    [OPTIONS]
    Units              	LPS
    Headloss           	H-W
    Specific Gravity   	1
    Viscosity          	1
    Trials             	40
    Accuracy           	0.001
    CHECKFREQ          	2
    MAXCHECK           	10
    DAMPLIMIT          	0
    Unbalanced         	Continue 10
    Pattern            	0
    Demand Multiplier  	1.0
    Emitter Exponent   	0.5
    Quality            	None mg/L
    Diffusivity        	1
    Tolerance          	0.01
    \n`);
  }
}
