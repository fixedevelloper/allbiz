import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
    Container,
    Row,
    Col,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from "reactstrap";
import {useTranslation} from "react-i18next";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const { t } = useTranslation();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="header dashboard">
            <Container>
                <Row>
                    <Col>
                        <Navbar light expand="lg" className="p-0">
                            <NavbarBrand href="/">
                                <img
                                    className="img-fluid"
                                    src="/images/w_logo.png"
                                    alt="logo"
                                />
                            </NavbarBrand>

                            <NavbarToggler onClick={toggle} />

                            <Collapse isOpen={isOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <Link className="nav-link" href="/dashboard">{t("header.dashboard")}</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" href="/referrals">{t("header.referrals")}</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" href="/roulettes">{t("header.roulettes")}</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" href="/documentation">{t("header.documentation")}</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>

                            {/* Partie droite */}
                            <div className="dashboard_log my-2">
                                <div className="d-flex align-items-center">
                                    {status === "authenticated" && (
                                        <UncontrolledDropdown nav inNavbar className="profile_log">
                                            <DropdownToggle nav className="user">
                                                <span className="thumb">
                                                    <i className="la la-user"></i>
                                                </span>
                                                <span className="name">
                                                    {session.user?.name || session.user?.email}
                                                </span>
                                                <span className="arrow">
                                                    <i className="la la-angle-down"></i>
                                                </span>
                                            </DropdownToggle>

                                            <DropdownMenu end>
                                                <Link className="dropdown-item" href="/withdraw">
                                                    <i className="la la-money"></i> {t("header.withdraw")}
                                                </Link>
                                                <Link className="dropdown-item" href="/history">
                                                    <i className="la la-book"></i> {t("header.history")}
                                                </Link>
                                                <Link className="dropdown-item" href="/settings">
                                                    <i className="la la-cog"></i> {t("header.settings")}
                                                </Link>

                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={() =>
                                                        signOut({ callbackUrl: "/auth/signin" })
                                                    }
                                                >
                                                    <i className="la la-sign-out"></i> {t("header.sign_out")}
                                                </button>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    )}
                                </div>
                            </div>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;

