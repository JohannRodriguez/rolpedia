// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel, Cont, ContRes } from '../../styles/blossom';

// Import Modules
import api_call from '../../api/api_call';
import CharacterCard from './CharacterCard';
import Header from './header/Header';

// Import data
import colors from '../../styles/colors.json';

const Characters = props => {
  const [lang] = useTranslation('characters');

  const [characters, setCharacters] = useState({});

  useEffect(async () => {
    const charactersFetch = await api_call('GET', `/api/v1/characters?user=${props.match.params.user}`);
    setCharacters(charactersFetch);
  }, []);

  return (
    <Cont styles={{ minHeight: '100vh', minWidth: '70vw', borderRight: `1px solid ${colors.grey}`, borderLeft: `1px solid ${colors.grey}`  }}>
      {!characters.status ?
        <img src="https://cdna.artstation.com/p/assets/images/images/016/928/246/original/cloe-ferrara-loader1-0.gif?1554021979" />
      : characters.status === 'SUCCESS' ?
        <>
          {characters.owner ?
            <Header path={props.location.pathname.toLowerCase().split('/').filter(e => e)}
              history={props.history} user={props.session.user.username}
            />
          : null}
          {characters.length === 0 ? 
            <p>{lang('empty_chars')}</p>
          :
            <ContRes params={{ aspectRatio: (16 / 9), }} styles={{
              backgroundImage: 'url(https://site.groupe-psa.com/content/uploads/sites/3/2016/12/white-background-2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end'
              }}>
              <Carousel params={{ items: 6, slideGap: 1, }}>
                {characters.characters.map((e, i) =>
                  <CharacterCard key={`${e.name}-${i}`} character={e} />
                )}
              </Carousel>
            </ContRes>
          }
        </>
    : <p>{lang('errors.no_user')}{`${props.match.params.user}`}</p>
    }</Cont>
  )
};

export default Characters;
