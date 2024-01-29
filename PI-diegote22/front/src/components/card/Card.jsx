// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { addFav, removeFav } from '../../redux/actions'

// function Card({id, name, species, status, gender, origin, image, onClose, ...props}) {

//    console.log(...props);
//    return (
//       <div>
//          <button onClick={()=> onClose(id)}>X</button>
//          <h2>{id}</h2>
//          <Link to={`/detail/${id}`}><h2>{name}</h2></Link>
//          <h2>{species}</h2>
//          <h2>{status} </h2>
//          <h2>{gender}</h2>
//          <h2>{origin}</h2>
//          <img src={image} alt='{name}' />
//       </div>
//    );
// }  

// function mapDispatchToProps(dispatch){
//    return {
//       addFav: function(characters){
//          dispatch(addFav(characters))
//       },
//       removeFav: function(id){
//          dispatch(removeFav(id))
//       },
//    }
// }
// export default connect(null, mapDispatchToProps)(Card)

////

import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function Card({
  id,
  name,
  species,
  status,
  gender,
  origin,
  image,
  onClose,
  addFav,
  removeFav,
  myFavorites
}) {
  const [isFav, setIsFav] = useState(false);

  const { pathname } = useLocation()

  function handleFavorite() {
    if (isFav) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav({
        id,
        name,
        species,
        status,
        gender,
        origin,
        image,
      });
    }
  }

  useEffect(()=>{
      myFavorites.forEach(charFav => {
         charFav.id === id && setIsFav(true)
      })
  },[id, myFavorites])

  return (
    <div>
      {isFav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button onClick={handleFavorite}>🤍</button>
      )}
      {
         pathname === '/home' && <button onClick={() => onClose(id)}>X</button>
      }

      <h2>{id}</h2>
      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
      </Link>
      <h2>{species}</h2>
      <h2>{status}</h2>
      <h2>{gender}</h2>
      <h2>{origin}</h2>
      <img src={image} alt={name} />
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  myFavorites: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    addFav: function (character) {
      dispatch(addFav(character));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

function mapStateToProps(state){
   return {
      myFavorites:state.myFavorites
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
