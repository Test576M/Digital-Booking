import SocialNetworks from '../../shared/SocialNetworks/SocialNetworks';
import './Footer.scss'

const Footer = ({ children }) => {
   return (
      <footer>
         <article className="leftSide">
            <p>{children}</p>
         </article>
         <article className="rightSide">
            <SocialNetworks />
         </article>
      </footer>
   );
};

export default Footer;
