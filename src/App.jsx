import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchBox from "./SearchBox";

const petfinder = pf({
    key: "8a6826b8a05de7e7d49dbdc2ed9bc7a3",
    secret: "f272ed0b554bd7e66c265faea27a8fcf"
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "Seattle, WA",
            animal: "",
            breed: "",
            breeds: [],
            handleAnimalChange: this.handleAnimalChange,
            handleBreedChange: this.handleBreedChange,
            handleLocationChange: this.handleLocationChange,
            getBreeds: this.getBreeds
        };
    }

    getBreeds() {
        if (this.state.animal) {
            petfinder.breed.list({ animal: this.state.animal }).then(data => {
                if (
                    data.petfinder &&
                    data.petfinder.breeds &&
                    Array.isArray(data.petfinder.breeds.breed)
                ) {
                    this.setState({
                        breeds: data.petfinder.breeds.breed
                    });
                } else {
                    this.setState({
                        breeds: []
                    });
                }
            });
        } else {
            this.setState({
                breeds: []
            });
        }
    }

    handleLocationChange = event => {
        this.setState({
            location: event.target.value
        });
    };

    handleAnimalChange = event => {
        this.setState(
            {
                animal: event.target.value,
                breed: ""
            },
            this.getBreeds
        );
    };

    handleBreedChange = event => {
        this.setState({
            breed: event.target.value
        });
    };

    render() {
        return (
            <div>
                <header>
                    <Link to="/">Adopt Me</Link>
                </header>
                <Provider value={this.state}>
                    <Router>
                        <Results path="/" />
                        <Details path="/details/:id" />
                        <SearchBox path="/search-params" />
                    </Router>
                </Provider>
            </div>
        );
    }
}

render(React.createElement(App), document.getElementById("root"));
