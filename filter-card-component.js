class FilterCardComponent extends HTMLElement{
    constructor() {
        super()
        this.img = document.createElement('img')
        this.src = this.getAttribute('src')
        this.color = this.getAttribute('color') || 'black'
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
        this.state = {h:0,dir:0}
    }
    defineShape(context,w,h) {
    }
    draw() {
        const w = this.image.width
        const h = this.image.height
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth/5
        canvas.height = canvas.width*(h/w)
        const context = canvas.getContext('2d')
        context.save()

        this.defineShape(context,canvas.width,canvas.height)
        context.drawImage(this.image,0,0,canvas.width,canvas.height)
        context.fillStyle = this.color
        context.globalAlpha = 0.5
        context.fillRect(0,0,canvas.width,this.state.h)
        context.restore()
        if(!this.state.maxH) {
            this.state.maxH = canvas.height
        }
        this.img.src = canvas.toDataURL()
    }
    startAnimating() {
        const dir = this.state.dir
        const h = this.state.h
        const maxH = this.state.maxH
        if(dir == 0) {

            if(h>=maxH) {
                this.state.dir = -1
            }
            else if(h<=0) {
                this.state.dir = 1
            }
            const interval = setInterval(()=>{
                this.draw()
                this.state.h += (this.state.dir * (this.state.maxH/5))
                if(this.state.h > this.state.maxH) {
                    this.state.h = this.state.maxH
                    this.state.dir = 0
                }
                else if(this.state.h < 0){
                    this.state.h = 0
                    this.state.dir = 0
                }
                if(this.state.dir == 0) {
                    clearInterval(interval)
                }
                console.log(this.state.h)
                console.log(this.state.maxH)
            },50)
        }
    }
    connectedCallback() {
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () => {
            this.draw()
        }
        this.img.onmousedown = () => {
            this.startAnimating()
        }
    }
}
class CircularFilterCardComponent extends FilterCardComponent {
    constructor() {
        super()
    }
    connectedCallback() {
        super.connectedCallback()
    }
    defineShape(context,w,h) {
        const r = Math.min(w,h)/2
        context.beginPath()
        context.arc(w/2,h/2,r,0,2*Math.PI)
        context.clip()
    }
}
customElements.define('filter-card',FilterCardComponent)
customElements.define('circular-filter-card',CircularFilterCardComponent)
