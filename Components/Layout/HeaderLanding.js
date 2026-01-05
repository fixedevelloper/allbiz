import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem
} from "reactstrap";
import Link from "next/link";
import {useTranslation} from "react-i18next";

const HeaderLanding = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { t, i18n } = useTranslation();
    const menuItems = [
        { id: "intro", label: "menu.home" },
        { id: "how-it-works", label: "menu.how" },
        { id: "portfolio", label: "menu.about" },
        { id: "testimonial", label: "menu.testimonial" },
        { id: "faq", label: "menu.faq" },
        { id: "contact", label: "menu.contact" },
    ];

    return (
        <div className="header dashboard">
            <Container>
                <Row>
                    <Col>
                        <Navbar light expand="lg" className="p-0">
                            <NavbarBrand href="/">
                                <img className="img-fluid" src="/images/w_logo.png" alt="logo" />
                                <span>AllBiz</span>
                            </NavbarBrand>

                            <NavbarToggler onClick={toggle} />

                            <Collapse isOpen={isOpen} navbar className="transition-collapse">
                                <Nav navbar className="ms-auto">
                                    {menuItems.map((item) => (
                                        <NavItem key={item.id}>
                                            <a className="nav-link" href={`#${item.id}`}>
                                                {t(item.label)}
                                            </a>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </Collapse>

                            <div className="dashboard_log my-2 d-flex align-items-center gap-2">
                                <div>
                                    <button className="lang-btn" onClick={() => i18n.changeLanguage("fr")}>🇫🇷</button>
                                    <button className="lang-btn" onClick={() => i18n.changeLanguage("en")}>🇬🇧</button>
                                </div>
                                <div className="header_auth d-flex gap-2">
                                    <Link href="/auth/signin" className="btn btn-success"> {t("btn.login")}</Link>
                                    <Link href="/auth/signup" className="btn btn-outline-primary">{t("btn.register")}</Link>
                                </div>
                            </div>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default HeaderLanding;
