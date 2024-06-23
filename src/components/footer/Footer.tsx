
import "./footer.css"

export default function Footer() {

// TODO: FUTURE FOR USERS TO SUBSCRIBE
const handleSubScribe = (e:React.MouseEvent<HTMLFormElement>)=>{
    e.preventDefault()
}
  return (
        <footer className="site-footer">
    <div className="footer-social">
        <h3>Stay Connected</h3>
        <ul>
            <li><a href="#"><i className="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
        </ul>
    </div>
    
    <div className="footer-contact">
        <h3>Contact Us</h3>
        <ul>
            <li>Email: <a href="mailto:libreblogtech@gmail.com">libreblogtech@gmail.com</a></li>
            {/* <li>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></li> */}
        </ul>
    </div>
    
    {/* <div className="footer-subscribe">
        <h3>Subscribe to Newsletter</h3>
        <form action="#" onSubmit={handleSubScribe}>
            <input type="email" name="email" placeholder="Your email address"/>
            <button type="submit">Subscribe</button>
        </form>
    </div>
     */}
    <div className="footer-info">
        <p>About Us: <a href="/">Learn more about our mission and team</a></p>
        <p>&copy; 2024 LibreBlog. All rights reserved.</p>
    </div>
       </footer>
  )
}
