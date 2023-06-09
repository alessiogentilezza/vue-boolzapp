const DateTime = luxon.DateTime;
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    image: 'img/01.webp',
                    avatar: 'img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: 'img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: 'img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: 'img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Sofia',
                    avatar: 'img/avatar_io.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: 'img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: 'img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: 'img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                },
            ],
            contattoAttivo: 0,
            searchContactText: "",
            userMessage: "",
            activeMessageIndex: -1,
            hidden: false,
            hiddenMenu: true,
            randomWord: ['si certo', 'ma anche no', 'mmm forse', 'ok va bene', 'magari un\'altra volta'],

        }
    },
    methods: {
        contactActive(indice) {
            this.contattoAttivo = indice;
        },
        addMessage() {
            const userMessage = this.userMessage.trim();
            if (userMessage !== "") {
                this.contacts[this.contattoAttivo].messages.push(
                    {
                        date: DateTime.now().setLocale('it').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                        message: this.userMessage,
                        status: 'sent'
                    }
                );
                this.userMessage = "";
                setTimeout(() => {
                    this.contacts[this.contattoAttivo].messages.push({
                        date: DateTime.now().setLocale('it').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                        message: this.randomWord[Math.floor(Math.random() * this.randomWord.length)],
                        status: "received"
                    }
                    );
                }, 2000);
            }
        },
        searchContacts() {
            this.contacts.forEach((element) => {
                if (element.name.toLowerCase().includes(this.searchContactText.toLowerCase())) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },
        showMenu(index) {
            if (this.activeMessageIndex == index) {
                this.hiddenMenu = !this.hiddenMenu;
            } else {
                this.activeMessageIndex = index;
                this.hiddenMenu = true;
            }
            console.log(this.activeMessageIndex);
            console.log(index);
            console.log(this.hiddenMenu);
        },
        deleteMessage(index) {
            this.contacts[this.contattoAttivo].messages.splice(index, 1);
            this.activeMessageIndex = -1;
        },
        showMenuDelete() {
            this.hidden = !this.hidden;
        },
        deleteAllMessage() {
            this.contacts[this.contattoAttivo].messages = "";
        },

        deleteConversation(index) {
            this.contacts.splice(index, 1);
            this.contattoAttivo = 0;
            this.hidden = !this.hidden;
        }





    }
}).mount('#app');