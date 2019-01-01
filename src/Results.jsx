import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
    key: "8a6826b8a05de7e7d49dbdc2ed9bc7a3",
    secret: "f272ed0b554bd7e66c265faea27a8fcf"
});

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pets: []
        };
    }

    componentDidMount() {
        petfinder.pet
            .find({ output: "full", location: "Seattle, WA" })
            .then(data => {
                let pets;
                if (data.petfinder.pets && data.petfinder.pets.pet) {
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet;
                    } else {
                        pets = [data.petfinder.pets.pet];
                    }
                } else {
                    pets = [];
                }

                this.setState({
                    pets
                });
            });
    }

    render() {
        return (
            <div className="search">
                {this.state.pets.map(pet => {
                    let breed;

                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(", ");
                    } else {
                        breed = pet.breeds.breed;
                    }

                    return (
                        <Pet
                            id={pet.id}
                            key={pet.id}
                            animal={pet.animal}
                            name={pet.name}
                            breed={breed}
                            media={pet.media}
                            location={`${pet.contact.city}, ${
                                pet.contact.state
                            }`}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Results;
