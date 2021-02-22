import Alert from './alert.vue'
import Vue from 'vue'

Alert.newInstance = () => {

    const Instance = new Vue({
        render(h) {
            return h(Alert)
        }
    })

    const component = Instance.$mount()
    document.body.appendChild(component.$el)
    const alert = Instance.$children[0]
    return {
        add(notice) {
            alert.add(notice)
        },
        remove(name) {
            alert.remove(name)
        }
    }
}

export default Alert