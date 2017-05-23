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
    draw(w,h) {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth/5
        canvas.height = canvas.width*(h/w)
        const context = canvas.getContext('2d')
        context.save()
        context.beginPath()
        this.defineShape(contet,canvas.width,canvas.height)
        context.drawImage(this.image,0,0,canvas.width,canvas.height)
        context.fillStyle = this.color
        context.globalAlpha = 0.5
        context.fillRect(0,0,canvas.width,this.h)
        context.restore()
        if(!this.state.maxH) {
            this.state.maxH = canvas.height
        }
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
            },100)
        }
    }
    connectedCallback() {
        const image = new Image()
        image.src = this.src
        image.onload = () => {
            this.draw(image.width,image.height)
        }
    }
}
customElements.define('filter-card',FilterCardComponent)
