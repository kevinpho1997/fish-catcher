// add sound effects?
// 
// give different score depending on type of fish caught
// 
// - first 3 fish 100, next 2 500, shark = 1k
// 
// Could make big net pierce - might be too much code
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - castCooldown >= 500) {
        castCooldown = game.runtime()
        if (bigNet >= 1) {
            projectile = sprites.createProjectileFromSprite(assets.image`bigNet`, boat, 0, 100)
            music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.UntilDone)
            bigNet += -1
            pause(500)
        } else {
            boat.sayText("No big nets", 1000, false)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - castCooldown >= 500) {
        castCooldown = game.runtime()
        projectile = sprites.createProjectileFromSprite(assets.image`net`, boat, 0, 50)
    }
})
info.onCountdownEnd(function () {
    game.showLongText("Nice fishing! Your score was: " + info.score() + ". \\n Your High Score is: " + info.highScore(), DialogLayout.Center)
    game.reset()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (otherSprite.image == enemyList[5]) {
        // shark collision
        info.changeScoreBy(1000)
        bigNet += 1
        boat.sayText("W! " + "Big nets:" + bigNet, 1500, false)
    } else {
        // If the enemy is at the bottom = more score
        // +
        // not shark
        if (enemySprite.y <= 110) {
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
let castCooldown = 0
let enemyList: Image[] = []
let bigNet = 0
let boat: Sprite = null
scene.setBackgroundImage(assets.image`Backdrop`)
boat = sprites.create(assets.image`PlayerSprite`, SpriteKind.Player)
bigNet = 0
controller.moveSprite(boat, 65, 0)
boat.setPosition(78, 25)
enemyList = [
assets.image`f1`,
assets.image`f2`,
assets.image`f3`,
assets.image`f5`,
assets.image`f4`,
assets.image`shark`
]
info.startCountdown(60)
castCooldown = -500
forever(function () {
    music.setVolume(50)
    music.play(music.createSong(assets.song`inGameMusic`), music.PlaybackMode.UntilDone)
})
game.onUpdateInterval(500, function () {
    enemySprite = sprites.create(enemyList[randint(0, 5)], SpriteKind.Enemy)
    enemySprite.setPosition(162, randint(35, 115))
    enemySprite.setVelocity(randint(-40, -60), 0)
})
