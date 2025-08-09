console.log("JS Loaded")

const app = Vue.createApp({
    data() {
        return {
            randomUser: {
                Name: '',
                Age: '',
                Avatar: ''
            },
            weather: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada',
                Temperature: '',
                Wind: '',
                Description: ''
            },
            dictionary: {
                word: '',
                phonetic: '',
                definition: ''
            }
        };
    }, 
    methods: {
        fetchRandomUser() {
            fetch('https://comp6062.liamstewart.ca/random-user-data')
                .then(response => response.json())
                .then(data => {
                    this.randomUser = {
                        Name: `${data.firstName} ${data.lastName}`,
                        Age: data.age,
                        Avatar: data.avatar
                    };
                })
                .catch(error => {
                    console.error("Error occured. Please try again",error);
                });
        },
        fetchtWeather() {
            fetch('https://comp6062.liamstewart.ca/weather-data?=${city}&province=${province}&country=${country}')
                .then(response => response.json())
                .then(data => {
                    this.weather = {
                        Temperature: `${data.currentTemp}`,
                        Wind: `${data.currentWind}`,
                        Description: `${data.currentCondition}`
                    };
                })
                .catch(error => {
                    console.error("Error occured. Please try again",error);
                });
        },
        fetchDictionary() {
            fetch('https://comp6062.liamstewart.ca/api/define?word=${this.dictionary.word}')
                .then(response => response.json())
                .then(data => {
                    this.dictionary = {
                        Word: data.word,
                        Phonetic: data.phonetic,
                        Definition: data.definition
                    };
                })
                .catch(error => {
                    console.error("Error occured. Please try again",error);
                });
        }
    },
    mounted() {
        this.fetchRandomUser();
        this.fetchWeather();
        this.fetchDictionary();
    }
});

app.mount('#app');