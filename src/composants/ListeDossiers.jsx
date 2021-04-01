import './ListeDossiers.scss';
import Dossier from './Dossier';
import * as crudDossiers from '../services/crud-dossiers';
import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function ListeDossiers({utilisateur, etatDossiers}) {
  // État des dossiers (vient du composant Appli)
  const [dossiers, setDossiers] = etatDossiers;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
    const classes = useStyles();
    const [trie, setTrie] = useState('');
  
    const handleChange = (event) => {
      setTrie(event.target.value);
    };
  

  // Lire les dossiers dans Firestore et forcer le réaffichage du composant
  // Remarquez que ce code est dans un useEffect() car on veut l'exécuter 
  // UNE SEULE FOIS (regardez le tableau des 'deps' - dépendances) et ceci 
  // APRÈS l'affichage du composant pour que la requête asynchrone à Firestore  
  // ait eu le temps d'être complétée et le réaffichage du composant soit
  // forcé par la mutation de l'état des dossiers
  useEffect(
    () => {
      crudDossiers.lireTout(utilisateur.uid).then(
        dossiers => setDossiers(dossiers)
      )
    }, []
  );

  /**
   * Gérer le clic du bouton 'supprimer' correspondant au dossier identifié en argument
   * @param {string} idd identifiant Firestore du dossier
   */
  async function gererSupprimer(idd) {
    // On fait appel à la méthode supprimer de notre code d'interaction avec Firestore
    crudDossiers.supprimer(utilisateur.uid, idd).then(
      () => {
        const tempDossiers = [...dossiers]; // copier le tableau des dossiers existants
        const dossiersRestants = tempDossiers.filter((elt) => elt.id!==idd); // filtrer pour garder tous les dossiers sauf celui qu'on a demandé de supprimer
        setDossiers(dossiersRestants); // Muter l'état pour forcer le réaffichage du composant
      }).catch(erreur => console.log('Échec de la suppression - Firestore a répondu :', erreur.message));
  }
  
  return (
    <>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Trie des dossiers
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Défaut</em>
          </MenuItem>
          <MenuItem value={10}>la date de modification descendante</MenuItem>
          <MenuItem value={20}>le nom de dossier alphabétique ascendant</MenuItem>
          <MenuItem value={30}>le nom de dossier alphabétique descendant</MenuItem>
        </Select>
      </FormControl>
    </div>
    <ul className="ListeDossiers">
      {
        (dossiers.length > 0) ?
          dossiers.map(dossier => <li key={dossier.id}><Dossier {...dossier} gererSupprimer={gererSupprimer} /></li>)
        :
          <li className="msgAucunDossier">
            Votre liste de dossiers est vide 
            <p>;-(</p>
          </li>
      }
    </ul>
    </>
  );
}