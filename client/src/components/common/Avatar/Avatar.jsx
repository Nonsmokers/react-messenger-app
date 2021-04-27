import React from "react";
import tinycolor from "tinycolor2";
import "./Avatar.scss";

const getCorrectIndex = number => {
    if (number > 255) {
        return 255;
    }
    if (number < 0) {
        return 0;
    }
    return number > 255 ? 255 : number < 0 ? 0 : number;
};

const generateAvatarFromHash = (hash) => {
    const [r, g, b] = hash
        .substr(0, 3)
        .split("")
        .map(char => getCorrectIndex(char.charCodeAt(0)));
    return {
        color: tinycolor({r, g, b})
            .lighten(10)
            .saturate(10)
            .toHexString(),
        colorLighten: tinycolor({r, g, b})
            .lighten(30)
            .saturate(30)
            .toHexString()
    };
};

const Avatar = ({user}) => {
    if (!user.avatar) {
        const {color, colorLighten} = generateAvatarFromHash(user._id);
        const firstChar = user.fullname[0].toUpperCase();
        return (
            <div style={{background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}}
                 className="avatar avatar--symbol"
            >
                {firstChar}
            </div>
        );
    } else {
        return (
            <img className="avatar"
                 src={user.avatar}
                 alt={`Avatar ${user.fullname}`}
            />
        )
    }
};

export default Avatar;

