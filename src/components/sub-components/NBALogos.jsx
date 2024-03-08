import hawks from '../../assets/nba-logos/hawks-logo.png';
import nets from '../../assets/nba-logos/nets-logo.png';
import pistons from '../../assets/nba-logos/pistons-logo.png';
import timberwolves from '../../assets/nba-logos/timberwolves-logo.png';
import pacers from '../../assets/nba-logos/pacers-logo.png';
import heat from '../../assets/nba-logos/heat-logo.png';
import mavericks from '../../assets/nba-logos/mavericks-logo.png';
import raptors from '../../assets/nba-logos/raptors-logo.png';
import suns from '../../assets/nba-logos/suns-logo.png';
import kings from '../../assets/nba-logos/kings-logo.png';
import spurs from '../../assets/nba-logos/spurs-logo.png';
import celtics from '../../assets/nba-logos/celtics-logo.png';
import nuggets from '../../assets/nba-logos/nuggets-logo.png';
import bulls from '../../assets/nba-logos/bulls-logo.png';
import warriors from '../../assets/nba-logos/warriors-logo.png';
import sixers from '../../assets/nba-logos/76ers-logo.png';
import lakers from '../../assets/nba-logos/lakers-logo.png';
import clippers from '../../assets/nba-logos/clippers-logo.png';
import pelicans from '../../assets/nba-logos/pelicans-logo.png';
import hornets from '../../assets/nba-logos/hornets-logo.png';
import jazz from '../../assets/nba-logos/jazz-logo.png';
import knicks from '../../assets/nba-logos/knicks-logo.png';
import thunder from '../../assets/nba-logos/thunder-logo.png';
import blazers from '../../assets/nba-logos/trail-blazers-logo.png';
import grizzlies from '../../assets/nba-logos/grizzlies-logo.png';
import rockets from '../../assets/nba-logos/rockets-logo.png';
import wizards from '../../assets/nba-logos/wizards-logo.png';
import bucks from '../../assets/nba-logos/bucks-logo.png';
import cavaliers from '../../assets/nba-logos/cavaliers-logo.png';
import magic from '../../assets/nba-logos/magic-logo.png';

export function getNBALogos(lastWord, w, h) {
  switch (lastWord.toLowerCase()) {
    case 'hawks':
      return (
        <img src={hawks} alt="pic of hawks logo" className={`h-${h} w-${w}`} />
      );
    case 'nets':
      return (
        <img src={nets} alt="pic of nets logo" className={`h-${h} w-${w}`} />
      );
    case 'pistons':
      return (
        <img
          src={pistons}
          alt="pic of pistons logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'timberwolves':
      return (
        <img
          src={timberwolves}
          alt="pic of timberwolves logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'pacers':
      return (
        <img
          src={pacers}
          alt="pic of pacers logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'heat':
      return (
        <img src={heat} alt="pic of heat logo" className={`h-${h} w-${w}`} />
      );
    case 'mavericks':
      return (
        <img
          src={mavericks}
          alt="pic of mavericks logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'raptors':
      return (
        <img
          src={raptors}
          alt="pic of raptors logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'suns':
      return (
        <img src={suns} alt="pic of suns logo" className={`h-${h} w-${w}`} />
      );
    case 'kings':
      return (
        <img src={kings} alt="pic of kings logo" className={`h-${h} w-${w}`} />
      );
    case 'spurs':
      return (
        <img src={spurs} alt="pic of spurs logo" className={`h-${h} w-${w}`} />
      );
    case 'celtics':
      return (
        <img
          src={celtics}
          alt="pic of celtics logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'nuggets':
      return (
        <img
          src={nuggets}
          alt="pic of nuggets logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'bulls':
      return (
        <img src={bulls} alt="pic of bulls logo" className={`h-${h} w-${w}`} />
      );
    case 'warriors':
      return (
        <img
          src={warriors}
          alt="pic of warriors logo"
          className={`h-${h} w-${w}`}
        />
      );
    case '76ers':
      return (
        <img
          src={sixers}
          alt="pic of sixers logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'lakers':
      return (
        <img
          src={lakers}
          alt="pic of lakers logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'clippers':
      return (
        <img
          src={clippers}
          alt="pic of clippers logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'pelicans':
      return (
        <img
          src={pelicans}
          alt="pic of pelicans logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'hornets':
      return (
        <img
          src={hornets}
          alt="pic of hornets logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'jazz':
      return (
        <img src={jazz} alt="pic of jazz logo" className={`h-${h} w-${w}`} />
      );
    case 'knicks':
      return (
        <img
          src={knicks}
          alt="pic of knicks logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'thunder':
      return (
        <img
          src={thunder}
          alt="pic of thunder logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'blazers':
      return (
        <img
          src={blazers}
          alt="pic of blazers logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'grizzlies':
      return (
        <img
          src={grizzlies}
          alt="pic of grizzlies logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'rockets':
      return (
        <img
          src={rockets}
          alt="pic of rockets logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'wizards':
      return (
        <img
          src={wizards}
          alt="pic of wizards logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'bucks':
      return (
        <img src={bucks} alt="pic of bucks logo" className={`h-${h} w-${w}`} />
      );
    case 'cavaliers':
      return (
        <img
          src={cavaliers}
          alt="pic of cavaliers logo"
          className={`h-${h} w-${w}`}
        />
      );
    case 'magic':
      return (
        <img src={magic} alt="pic of magic logo" className={`h-${h} w-${w}`} />
      );
  }
}
