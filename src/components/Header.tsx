
type HeaderProps = {
location: string 
}

function Header({ location }: HeaderProps) {
    return <h3>Current Temperature in {location}</h3>
}

export default Header