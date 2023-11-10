import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            <footer className="main-footer">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                <strong>Copyright © 2022 .</strong> All rights reserved.
                            </div>
                            <div className="col-md-8 footercol">
                                <Link to=''><strong className="footerright">Contact Us</strong></Link>
                                <Link to=''><strong className="footerright me-3">Terms and Conditions</strong></Link>
                                <Link to=''><strong className="footerright me-3">Policies</strong></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer