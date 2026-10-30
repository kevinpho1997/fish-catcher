/**
 * on b button press
 * 
 * make a big net, you get 1 net every x score
 * 
 * make a timer for the game, say 60 seconds
 * 
 * add music
 * 
 * add sound effects?
 * 
 * give different score depending on type of fish caught 
 * 
 * - first 3 fish 100, next 2 500, shark = 1k
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`net`, boat, 0, 50)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.bubbles, 100)
    sprite.destroy()
    if (enemySprite.y < 100) {
        info.changeScoreBy(100)
    } else {
        info.changeScoreBy(500)
    }
})
let enemySprite: Sprite = null
let projectile: Sprite = null
let boat: Sprite = null
scene.setBackgroundImage(assets.image`Backdrop`)
boat = sprites.create(assets.image`PlayerSprite`, SpriteKind.Player)
controller.moveSprite(boat, 100, 0)
boat.setPosition(78, 18)
let enemyList = [
assets.image`f1`,
assets.image`f2`,
assets.image`f3`,
assets.image`f5`,
assets.image`f4`,
assets.image`shark`
]
game.onUpdateInterval(500, function () {
    enemySprite = sprites.create(enemyList[randint(0, 5)], SpriteKind.Enemy)
    enemySprite.setPosition(162, randint(25, 160))
    enemySprite.setVelocity(-50, 0)
})
