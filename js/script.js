'use strict'
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
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);

        return element;
    }

    function Column(name) {
        var self = this;
        this.id = idRegister.addId();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name, id: this.id });
        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
                self.removeColumn();
                idRegister.removeId(self.id);
            }
            if (event.target.classList.contains('add-card')) {
                self.addCard(new Card(prompt('Enter the name of the card')));
            }
        })
    }
    
    Column.prototype = {
        addCard: function (card) {
            this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function () {
            this.element.parentNode.removeChild(this.element);
        }
    }

    function Card(description) {
        var self = this;
        this.description = description;
        this.id = idRegister.addId();
        this.element = generateTemplate('card-template', { description: this.description }, 'li');
        this.element.querySelector('.card').addEventListener('click', function(event){
            event.stopPropagation();
            if (event.target.classList.contains('btn-delete')) {
                self.removeCard();
                idRegister.removeId(self.id);
            }
        })
    }

    Card.prototype = {
        removeCard: function () {
            this.element.parentNode.removeChild(this.element);
        }
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.element.appendChild(column.element);
            initSortable(column.id);
        },
        element: document.querySelector('#board .column-container')
    }
    
    document.querySelector('#board .create-column').addEventListener('click', function(){
        var name = prompt('Enter column name');
        var column = new Column(name);
        board.addColumn(column);
    })
    
    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
            group: 'kanban',
            sort: true
        })
    }

    var idRegister = {
        items: [],
        addId: function() {
            var id
            do {
                id = randomString();
            } while (this.items.indexOf(id) !== -1);
            this.items.push(id);
            return id
        },
        removeId: function(id) {
            var index = this.items.indexOf(id);
            this.items.splice(index, 1);
        }
    }

    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
})

