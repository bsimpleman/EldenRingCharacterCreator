import { useState, useEffect } from 'react'
import './dropdown.css'

function Dropdown(props) {
    const [isTyping, setIsTyping] = useState(false);
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);

    const items = props.items;
    const multiSelect = props.multiSelect || false;
    const toggle = () => setOpen(!open);
    const filterData = getFilterData(isTyping, title);

    function getFilterData(isTyping, title = '') {
        if (!isTyping) {
            return items;
        }
        return items.filter((item) => (
           item.Name.toLowerCase().includes(title.toLowerCase())
        ));
    }

    function handleInputChange(value) {
        setIsTyping(true);
        setTitle(value);
    }

    function handleOnClick(item) {
        console.log(item)
        if (!selection.some(current => current.id === item.id)) {
            if (!multiSelect) {
                setSelection([item]);
                setTitle(item.Name)
                setOpen(false)
                setIsTyping(false)
                props.onSet(item)
            } else if (multiSelect) {
                setSelection([...selection, item])
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval]);
        }
    }

    function isItemInSelection(item) {
        if (selection.some(current => current.id === item.id)) {
            return true;
        }
        return false;
    }

    return (
        <div className="dd-wrapper">
            <div tabIndex={0}
                 className="dd-header"
                 role="button"
                 onClick={() => toggle(!open)}>
                <div className="dd-header__title">
                    {console.log(title)}
                    <input type="text" className="dd-header__title--bold" placeholder={props.slot} value={title} onChange={(event) => handleInputChange(event.target.value)}></input>
                </div>

            </div>
            {open && (
                <ul className="dd-list">
                    {filterData.map(item => (
                        <li className="dd-list-item" key={item.id}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item.Name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;