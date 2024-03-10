import './Header.css';

function Header() {
    return (
        <header id='Header'>
            <nav>
                <ul>
                    <li className='item'>
                        <i className='fa-solid fa-map fa-xl' />
                        <h6 className='title'>
                            <i className='fa-solid fa-play' />
                            MAP
                        </h6>
                    </li>
                    <div className='hline' />
                    <li className='item'>
                        <i className='fa-solid fa-layer-group fa-xl' />
                        <h6 className='title'>
                            <i className='fa-solid fa-play' />
                            LAYER
                        </h6>
                    </li>
                    <div className='hline' />
                    <li className='item'>
                        <i className='fa-solid fa-location-dot fa-xl' />
                        <h6 className='title'>
                            <i className='fa-solid fa-play' />
                            MARKER
                        </h6>
                    </li>
                </ul>
                <ul>
                    <li className='item'>
                        <i className='fa-solid fa-bookmark fa-xl' />
                        <h6 className='title'>
                            <i className='fa-solid fa-play' />
                            BOOKMARK
                        </h6>
                    </li>
                    <li className='item'>
                        <i className='fa-solid fa-circle-user fa-xl' />
                        <h6 className='title'>
                            <i className='fa-solid fa-play' />
                            USER
                        </h6>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;