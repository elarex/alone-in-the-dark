let direction = -1
let quiet = true
Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
basic.forever(function () {
    if (input.soundLevel() > 0) {
        if (quiet) {
            direction = direction * -1
        }
        quiet = false
    } else {
        quiet = true
    }
    if (Kitronik_Move_Motor.measure() < 5) {
        Kitronik_Move_Motor.beepHorn()
        quiet = true
    }
    if (quiet) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        Kitronik_Move_Motor.stop()
    } else if (direction > 0) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 0)
        basic.showArrow(ArrowNames.North)
    } else {
        basic.showArrow(ArrowNames.South)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 0)
    }
})
