document.addEventListener('DOMContentLoaded', () => {
    function randomString(length = 10) {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (let i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function generateTemplate(name, data, basicElement) {
        var template = document.querySelector(name).innerHtml;
        var element = document.createElement(basicElement || 'div');
        Mustache.parse(template);
        element.innerHtml = Mustache.render(template, data);

        return element;
    }

    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name });
        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
                self.removeColumn();
            }
            if (event.target.classList.contains('add-card')) {
                self.addCard(new Card(promt('Enter the name of the card')));
            }
        })
    }
    
    Column.prototype = {
        addCard: function (card) {
            this.element.querySelector('ul').appendChild(card.element);
        },
        removeCard: function () {
            this.element.parentNode.removeChild(this.element);
        }
    }
})

