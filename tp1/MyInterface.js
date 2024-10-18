import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();
        this.gui.width = 350;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Checkbox element in GUI for diamond visibility
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        //Checkbox element in GUI for triangle visibility
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        //Checkbox element in GUI for parallelogram visibility
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        //Checkbox element in GUI for small triangle visibility
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Small Triangle');

        //Checkbox element in GUI for big triangle visibility
        this.gui.add(this.scene, 'displayTriangleBig').name('Display Big Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}