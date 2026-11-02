// on b button press
// 
// make a big net, you get 1 net every x score
// 
// make a timer for the game, say 60 seconds
// 
// add music
// 
// add sound effects?
// 
// give different score depending on type of fish caught
// 
// - first 3 fish 100, next 2 500, shark = 1k
// 
// Could make big net pierce - might be too much code
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bigNet > 1) {
        projectile = sprites.createProjectileFromSprite(assets.image`bigNet`, boat, 0, 75)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`net`, boat, 0, 50)
    pause(500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (otherSprite.image == enemyList[5]) {
        // shark collision
        info.changeScoreBy(1000)
        bigNet += 1
        boat.sayText("BIG WIN!")
    } else {
        // If the enemy is at the bottom = more score
        // +
        // not shark
        if (enemySprite.y >= 110) {
            info.changeScoreBy(100)
        } else {
            info.changeScoreBy(500)
            bigNet += 1
        }
    }
    otherSprite.destroy(effects.bubbles, 100)
    sprite.destroy()
})
let enemySprite: Sprite = null
let projectile: Sprite = null
let enemyList: Image[] = []
let bigNet = 0
let boat: Sprite = null
scene.setBackgroundImage(assets.image`Backdrop`)
boat = sprites.create(assets.image`PlayerSprite`, SpriteKind.Player)
bigNet = 0
controller.moveSprite(boat, 100, 0)
boat.setPosition(78, 18)
enemyList = [
assets.image`f1`,
assets.image`f2`,
assets.image`f3`,
assets.image`f5`,
assets.image`f4`,
assets.image`shark`
]
game.onUpdateInterval(500, function () {
    enemySprite = sprites.create(enemyList[randint(0, 5)], SpriteKind.Enemy)
    enemySprite.setPosition(162, randint(25, 115))
    enemySprite.setVelocity(randint(-40, -60), 0)
})
