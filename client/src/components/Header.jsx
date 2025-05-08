import React, { useState } from 'react';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from 'react-icons/fa6';
import useMobile from '../hooks/useMobile';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const [isMobile] = useMobile();
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);

    const redirectToLoginPage = () => {
        navigate('/login');
    };

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    };

    const handleMobileUser = () => {
        if (!user._id) {
            navigate('/login');
            return;
        }
        navigate('/user');
    };

    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
            {!(isSearchPage && isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                    {/* Replaced Logo with "Home" Button */}
                    <div className='h-full flex items-center'>
    <Link to={'/'}>
        <p className='text-lg px-2 cursor-pointer'>Home</p>
    </Link>
</div>


                    {/* Search */}
                    <div className='hidden lg:block'>
                        <Search />
                    </div>

                    {/* Login and My Cart */}
                    <div className=''>
                        {/* User icons display in only mobile version */}
                        <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                            <FaRegCircleUser size={26} />
                        </button>

                        {/* Desktop */}
                        <div className='hidden lg:flex items-center gap-10'>
                            {user?._id ? (
                                <div className='relative'>
                                    <div
                                        onClick={() => setOpenUserMenu((prev) => !prev)}
                                        className='flex select-none items-center gap-1 cursor-pointer'
                                    >
                                        <p>Account</p>
                                        {openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />}
                                    </div>
                                    {openUserMenu && (
                                        <div className='absolute right-0 top-12'>
                                            <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                <UserMenu close={handleCloseUserMenu} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button onClick={redirectToLoginPage} className='text-lg px-2'>
                                    Login
                                </button>
                            )}

                            {/* Cart Button */}
                            <button
                                onClick={() => setOpenCartSection(true)}
                                style={{ backgroundColor: '#27667B', color: 'white' }}
                                className='flex items-center gap-2 px-3 py-2 rounded hover:bg-[#1E4F5F] transition-colors duration-300'
                            >
                                <div className='animate-bounce'>
                                    <BsCart4 size={26} />
                                </div>
                                <div className='font-semibold text-sm'>
                                    {cartItem[0] ? (
                                        <div>
                                            <p>{totalQty} Items</p>
                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                        </div>
                                    ) : (
                                        <p>My Cart</p>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
        </header>
    );
};

export default Header;
