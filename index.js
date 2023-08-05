const canvas = document.querySelector ('canvas')
const c = canvas.getContext('2d')
const score = document.querySelector ('#score')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boundary {
    static width = 40
    static height = 40
    constructor ({position, image}) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }


    draw () {
        //c.fillStyle = 'blue'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Player {
    constructor ({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw() {
        c.beginPath()
        c.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class Ghost {
    static speed = 2
    constructor ({position, velocity, color = 'red'}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollisions = []
        this.speed = 2
    }
    draw() {
        c.beginPath()
        c.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor ({position, velocity}) {
        this.position = position
        this.radius = 3
    }
    draw() {
        c.beginPath()
        c.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

/*class PowerUp {
    constructor ({position, velocity}) {
        this.position = position
        this.radius = 7
    }
    draw() {
        c.beginPath()
        c.arc (this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'lightblue'
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}*/

    const map = [
        ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
        ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
        ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
    ]

    function createImage (src) {
        const image = new Image()
        image.src = src
        return image
    }
    
    const powerUps = []
    const pellets = []
    const boundaries = []
    const ghosts = [
        new Ghost ({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.width / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }
    }),
    new Ghost ({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 3 + Boundary.width / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        },
        color: 'pink'
    })
]

    


    const player = new Player({
        position: {
            x: Boundary.width + Boundary.width / 2,
            y: Boundary.height + Boundary.width / 2
        },
        velocity: {
            x: 0,
            y: 0
        }
    })

    const keys = {
        w: {
            pressed: false
        },
        s: {
            pressed: false
        },
        a: {
            pressed: false
        },
        d: {
            pressed: false
        }
    }

    let lastKey = ''
    let scoreJS = 0

    map.forEach ((row, indexY) => {
        row.forEach((symbol, indexX) => {
            switch (symbol) {
                case '-': 
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * indexX,
                        y: Boundary.height * indexY
                    },
                    image: createImage('./img/pipeHorizontal.png')
                }))
            break
            case '|': 
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * indexX,
                        y: Boundary.height * indexY
                    },
                    image: createImage('./img/pipeVertical.png')
                }))
            break
            case '1': 
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * indexX,
                        y: Boundary.height * indexY
                    },
                    image: createImage('./img/pipeCorner1.png')
                }))
            break
            case '2': 
            boundaries.push(new Boundary({
                position: {
                    x: Boundary.width * indexX,
                    y: Boundary.height * indexY
                },
                image: createImage('./img/pipeCorner2.png')
            }))
            break
            case '3': 
            boundaries.push(new Boundary({
                position: {
                    x: Boundary.width * indexX,
                    y: Boundary.height * indexY
                },
                image: createImage('./img/pipeCorner3.png')
            }))
            break
            case '4': 
            boundaries.push(new Boundary({
                position: {
                    x: Boundary.width * indexX,
                    y: Boundary.height * indexY
                },
                image: createImage('./img/pipeCorner4.png')
            }))
            break
            case 'b': 
            boundaries.push(new Boundary({
                position: {
                    x: Boundary.width * indexX,
                    y: Boundary.height * indexY
                },
                image: createImage('./img/block.png')
            }))
            break
            case '[':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    image: createImage('./img/capLeft.png')
                  })
                )
                break
              case ']':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    image: createImage('./img/capRight.png')
                  })
                )
                break
              case '_':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    image: createImage('./img/capBottom.png')
                  })
                )
                break
              case '^':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    image: createImage('./img/capTop.png')
                  })
                )
                break
              case '+':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    image: createImage('./img/pipeCross.png')
                  })
                )
                break
              case '5':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorTop.png')
                  })
                )
                break
              case '6':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorRight.png')
                  })
                )
                break
              case '7':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorBottom.png')
                  })
                )
                break
              case '8':
                boundaries.push(
                  new Boundary({
                    position: {
                        x: indexX * Boundary.width,
                        y: indexY * Boundary.height
                    },
                    image: createImage('./img/pipeConnectorLeft.png')
                  })
                )
                break
              case '.':
                pellets.push(
                  new Pellet({
                    position: {
                      x: indexX * Boundary.width + Boundary.width/ 2,
                      y: indexY * Boundary.height + Boundary.width/ 2
                    }
                  })
                )
                break
                case 'p':
                powerUps.push(
                  new PowerUp({
                    position: {
                      x: indexX * Boundary.width + Boundary.width/ 2,
                      y: indexY * Boundary.height + Boundary.width/ 2
                    }
                  })
                )
                break
        }
        })
    })

    function collisionDetection ({circle, rectangle}) {
        const padding = Boundary.width / 2 - circle.radius - 1
        return (
             circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
             circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
             circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
             circle.position.x - circle.radius +  circle.velocity.x <= rectangle.position.x + rectangle.width + padding
        )
    }

    let animationId 
    function animate () {
        animationId = requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)

      pellets.forEach((pellet, index) => {
            pellet.draw()
            if(Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
                pellets.splice(index, 1)
                scoreJS += 10
                score.innerHTML = scoreJS
            }
        })
        boundaries.forEach(boundary => {
            boundary.draw()
            if (
                collisionDetection ({
                    circle: player,
                    rectangle: boundary
                })
                ) {
                    player.velocity.y = 0
                    player.velocity.x = 0
                }

         
        })
    


        player.update() 

        ghosts.forEach ((ghost) => {
            ghost.update()

            if(Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) < ghost.radius + player.radius) {
                cancelAnimationFrame(animationId)
                console.log('you lost')
            }

            if (pellets.length === 0) {
                console.log ('you won')
                cancelAnimationFrame(animationId)
            }
            const collisions = []
            boundaries.forEach(boundary => {
                if(!collisions.includes('right') &&
                collisionDetection({
                    circle: {...ghost, velocity: {
                        x: ghost.speed,
                        y: 0
                    }},
                    rectangle: boundary
                })
                ) {
                    collisions.push('right')
                } 
                if(!collisions.includes('left') &&
                collisionDetection({
                    circle: {...ghost, velocity: {
                        x: -ghost.speed,
                        y: 0
                    }},
                    rectangle: boundary
                })
                ) {
                    collisions.push('left')
                }
                if(!collisions.includes('up') &&
                collisionDetection({
                    circle: {...ghost, velocity: {
                        x: 0,
                        y: -ghost.speed
                    }},
                    rectangle: boundary
                })
                ) {
                    collisions.push('up')
                }
                if(!collisions.includes('down') &&
                collisionDetection({
                    circle: {...ghost, velocity: {
                        x: 0,
                        y: ghost.speed
                    }},
                    rectangle: boundary
                })
                ) {
                    collisions.push('down')
                }
            })
            if(collisions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collisions
            }
            if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
                if(ghost.velocity.x >0) ghost.prevCollisions.push('right')
                else if(ghost.velocity.x <0) ghost.prevCollisions.push('left')
                else if(ghost.velocity.y <0) ghost.prevCollisions.push('up')
                else if(ghost.velocity.y >0) ghost.prevCollisions.push('down')

                const pathways = ghost.prevCollisions.filter(collision => {
                    return !collisions.includes(collision)
                })
                const directions = pathways[Math.floor(Math.random() * pathways.length)]
          
            switch (directions) {
                case 'down' : 
                ghost.velocity.x = 0
                ghost.velocity.y = ghost.speed
                break
                case 'up' : 
                ghost.velocity.x = 0
                ghost.velocity.y = -ghost.speed
                break
                case 'right' : 
                ghost.velocity.x = ghost.speed
                ghost.velocity.y = 0
                break
                case 'left' : 
                ghost.velocity.x = -ghost.speed
                ghost.velocity.y = 0
                break
            }
            ghost.prevCollisions = []
        }
        })
       

        if (keys.w.pressed && lastKey === 'w') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(collisionDetection({
                    circle: {...player, velocity: {
                        x: 0,
                        y: -5
                    }},
                    rectangle: boundary
                })
                ) {
                    player.velocity.y = 0
                } else {
                    player.velocity.y = -5
                }
            }
           
        } else if (keys.s.pressed && lastKey === 's') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(collisionDetection({
                    circle: {...player, velocity: {
                        x: 0,
                        y: -5
                    }},
                    rectangle: boundary
                })
                ) {
                    player.velocity.y = 0
                } else {
                    player.velocity.y = -5
                }
            }
            player.velocity.y = 5
        } else if (keys.a.pressed && lastKey === 'a') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(collisionDetection({
                    circle: {...player, velocity: {
                        x: -5,
                        y: 0
                    }},
                    rectangle: boundary
                })
                ) {
                    player.velocity.x = 0
                } else {
                    player.velocity.x = -5
                }
            }
        } else if (keys.d.pressed && lastKey === 'd') {
            for(let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if(collisionDetection({
                    circle: {...player, velocity: {
                        x: 5,
                        y: 0
                    }},
                    rectangle: boundary
                })
                ) {
                    player.velocity.x = 0
                } else {
                    player.velocity.x = 5
                }
            }
        }
    }
   
    animate()

    window.addEventListener ('keydown', ({key}) => {
       switch (key) {
        case 'w': 
        keys.w.pressed = true
        lastKey = 'w'
        break
        case 'a': 
        keys.a.pressed = true
        lastKey = 'a'
        break
        case 'd': 
        keys.d.pressed = true
        lastKey = 'd'
        break
        case 's': 
        keys.s.pressed = true
        lastKey = 's'
        break   
       }
    })

    window.addEventListener ('keyup', ({key}) => {
      switch (key) {
        case 'w': 
         keys.w.pressed = false
         break
        case 'a': 
         keys.a.pressed = false
         break
        case 'd': 
         keys.d.pressed = false
         break
        case 's': 
         keys.s.pressed = false
         break
        }
     })