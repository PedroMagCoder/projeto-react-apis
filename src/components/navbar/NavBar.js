import React from "react";
import { NavContainer, NavStyled, Titulo } from "./style";
import { Button, RangeSliderThumb } from "@chakra-ui/react";
import pokemonLogo from "../../imagens/pokemonLogo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { goToPokedex, goToHome } from "../../router/Cordinator";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import flecha from "../../imagens/flecha.png";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(GlobalContext);
  const { apagarDaPokedex, pokedex, adicionarApokedex } = context;
  const { name } = useParams();
 
  return (
    <NavStyled>
      {(() => {
        switch (location.pathname) {
          case "/":
            return (
              <NavContainer>
                <div>
                  <img src={pokemonLogo} alt="" />                
                  <Button onClick={() => goToPokedex(navigate)}>Pokedex</Button>
                </div>
              </NavContainer>
            );
          case "/pokedex":
            return (
              <NavContainer>
                <div>
                  <img className="Flecha" src={flecha} />
                  <a onClick={() => goToHome(navigate)}>Todos Pokémons</a>
                </div>
                <div>
                  <img src={pokemonLogo} alt="" />
                </div>
              </NavContainer>
            );
          case `/details/${name}`:
            const pokemon = pokedex.find(
              (pokemon) => pokemon.name === name.toLowerCase()
            );
            console.log(pokemon, "pokemon");
            return (
              <NavContainer>
                <div>
                  <a onClick={() => goToHome(navigate)}>
                    <img className="Flecha" src={flecha} />
                    Todos Pokémons
                  </a>
                </div>
                <div>
                  <img src={pokemonLogo} alt="" />
                </div>
                {pokemon ? (
                  <Button                    
                    colorScheme={"red"}
                    onClick={() => {
                      apagarDaPokedex(pokemon);
                    }}
                  >
                    Excluir
                  </Button>
                ) : (
                  <div className="Botão">
                    <Button                      
                      onClick={() => goToPokedex(navigate)}
                    >
                      Pokedex
                    </Button>
                  </div>
                )}
              </NavContainer>
            );
        }
      })()}
    </NavStyled>
  );
}

export default NavBar;
