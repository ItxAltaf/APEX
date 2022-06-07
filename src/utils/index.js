import {ToastAndroid, Platform, Dimensions, PixelRatio} from 'react-native';
import {PERMISSIONS, request, RESULTS, check} from 'react-native-permissions';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// const images = {
//     'splash_bg': require('./images/splash_bg.png'),
//     'user': require('./images/user.png'),
//     'lock': require('./images/lock.png'),
//     'logo': require('./images/logo.png'),
//     'loader': require('./images/loader.gif'),
//     'face': require('./images/face.png'),
//     'step_one': require('./images/step_one.png'),
//     'step_two': require('./images/step_two.png'),
//     'step_three': require('./images/step_three.png'),
//     'right_orange': require('./images/right_orange.png'),
//     'color_bg': require('./images/color_bg.png'),
//     'bottom_arrow': require('./images/bottom_arrow.png'),
//     'white_dot': require('./images/white_dot.png'),
//     'green_dot': require('./images/green_dot.png'),
//     'orange_dot': require('./images/orange_dot.png'),
//     'gray_dot': require('./images/gray_dot.png'),
//     'video': require('./images/video_.mp4'),
//     'buyandsell_orange': require('./images/buyandsell_orange.png'),
//     'circles_orange': require('./images/circles_orange.png'),
//     'courses_orange': require('./images/courses_orange.png'),
//     'buyandsell_purple': require('./images/buyandsell_purple.png'),
//     'circles_purple': require('./images/circles_purple.png'),
//     'courses_purple': require('./images/courses_purple.png'),
//     'header_logo': require('./images/header_logo.png'),
//     'menu': require('./images/menu.png'),
//     'send_white': require('./images/send_white.png'),
//     'search': require('./images/search.png'),
//     'bell': require('./images/bell.png'),
//     'clubs': require('./images/clubs.png'),
//     'post_filter': require('./images/post_filter.png'),
//     'create_post': require('./images/create_post.png'),
//     'reading_orange': require('./images/reading_orange.png'),
//     'reading_white': require('./images/reading_white.png'),
//     'friends_purple': require('./images/friends_purple.png'),
//     'friends_white': require('./images/friends_white.png'),
//     'camera': require('./images/camera.png'),
//     'profile': require('./images/profile.jpeg'),
//     'd_edit': require('./images/d_edit.png'),
//     'saved_posts': require('./images/saved_posts.png'),
//     'my_friends': require('./images/my_friends.png'),
//     'register_club': require('./images/register_club.png'),
//     'upgrade': require('./images/upgrade.png'),
//     'logout': require('./images/logout.png'),
//     'report_problem': require('./images/report_problem.png'),
//     'help': require('./images/help.png'),
//     'post_settings': require('./images/post_settings.png'),
//     'right_d_push': require('./images/right_d_push.png'),
//     'right_d_pull': require('./images/right_d_pull.png'),
//     'comments': require('./images/comments.png'),
//     'appre_gray': require('./images/appre_gray.png'),
//     'appre_orange': require('./images/appre_orange.png'),
//     'save_this_post': require('./images/save_this_post.png'),
//     'hide_this_post': require('./images/hide_this_post.png'),
//     'report_this_post': require('./images/report_this_post.png'),
//     'turn_on_notifications': require('./images/turn_on_notifications.png'),
//     'copy_link': require('./images/copy_link.png'),
//     'down_arrow': require('./images/down_arrow.png'),
//     'black_camera': require('./images/black_camera.png'),
//     'poll': require('./images/poll.png'),
//     'buy_favo': require('./images/buy_favo.png'),
//     'buy_favo_gray': require('./images/buy_favo_gray.png'),
//     'buy_search': require('./images/buy_search.png'),
//     'buy_filter': require('./images/buy_filter.png'),
//     'buy_heart': require('./images/buy_heart.png'),
//     'buy_check': require('./images/buy_check.png'),
//     'buy_uncheck': require('./images/buy_uncheck.png'),
//     'buy_plus': require('./images/buy_plus.png'),
//     'buy_del_img': require('./images/buy_del_img.png'),
//     'back_black': require('./images/back_black.png'),
//     'back_white': require('./images/back_white.png'),
//     'back_purple': require('./images/back_purple.png'),
//     'users': require('./images/users.png'),
//     'p_arrow_chat': require('./images/p_arrow_chat.png'),
//     'g_arrow_chat': require('./images/g_arrow_chat.png'),
//     'chat_upload': require('./images/chat_upload.png'),
//     'micro_phone': require('./images/micro_phone.png'),
//     'similie_picker': require('./images/similie_picker.png'),
//     'c_send': require('./images/c_send.png'),
//     'user_orange': require('./images/user_orange.png'),
//     'c_plus': require('./images/c_plus.png'),
//     'c_minus': require('./images/c_minus.png'),
//     'group_tri': require('./images/group_tri.png'),
//     'cross_purple': require('./images/cross_purple.png'),
//     'circle_purple': require('./images/circle_purple.png'),
//     'tick_purple': require('./images/tick_purple.png'),
//     'art': require('./images/art.png'),
//     'clock': require('./images/clock.png'),
//     'arrow_down': require('./images/arrow_down.png'),
//     'film': require('./images/film.png'),
//     'play': require('./images/play.png'),
//     'login_bg': require('./images/login_bg.jpeg'),
//     'camera_purple': require('./images/camera_purple.png'),
//     'comment_close': require('./images/comment_close.png'),
//     'down_ar': require('./images/down_ar.png'),
//     'up_ar': require('./images/up_ar.png'),
//     'loader1': require('./images/loader1.gif'),
//     'loader2': require('./images/loader2.gif'),
//     'pencil': require('./images/pencil.png'),
//     'frnd_req': require('./images/frnd_req.png'),
//     'sent_orange': require('./images/sent_orange.png'),
//     'bell_simple': require('./images/bell_simple.png'),
//     'purple_corner': require('./images/purple_corner.png'),
//     'white_corner': require('./images/white_corner.png'),
//     'grey_corner': require('./images/grey_corner.png'),
//     'camera_white': require('./images/camera_white.png'),
//     'chat_orange': require('./images/chat_orange.png'),
//     'close_white': require('./images/close_white.png'),
//     'three_dots': require('./images/three_dots.png'),
//     'refresh': require('./images/refresh.png'),
//     'purple_pencil': require('./images/purple_pencil.png'),
// };
const colours = {
    'white': 'white',
    'black': 'black',
    'orange': '#e86243',
    'purple': '#76569f',
    'text_gray': '#606060',
    'gray_text_color': '#959595',
    'gray_background': '#E2E2E2',
    'light_purple': '#C9BFD8',
    'not_light_purple': '#e4dfec',
    'dark_gray_text': '#606060',
    'extra_light_purple': '#ede9f4',
    'chat_gray': '#9E9E9E',
    'group_white': '#F2F2F2',
    'place': '#B0B0B2',
    'avatar': '#A0A0A0',
};

function _alert(string) {
    if (string != 'Token Authentication Failed.') {
        if (Platform.OS == 'ios') {
            alert(string);
        } else {
            ToastAndroid.showWithGravity(
                string,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        }
    }

}

function isIphoneXorAbove() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

function _toast(string) {
    if (Platform.OS == 'ios') {
        alert(string);
    } else {
        ToastAndroid.showWithGravity(
            string,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
           
        );
    }

}

function _font(size) {
    const scale = SCREEN_WIDTH / 320;
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

function _truncateText(limit = 17, text) {
    return text.length > limit ? `${text.substr(0, limit)}..` : text;
    //return text;
}

function _encode(value) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = value;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
         str.charAt(i | 0) || (map = '=', i % 1);
         output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
        }

        block = block << 8 | charCode;
    }

    return output;
}

function _get_chat_id(from_user, to_user) {
    // let from_user = _encode(from);
    // let to_user = _encode(to);
    let chat_id = (from_user < to_user) ? from_user + '_' + to_user : to_user + '_' + from_user;
    return chat_id;
}

// async function _permissions() {
//     if (Platform.OS == 'ios') {
//         return true;
//     }
//     let permission1 = await request(PERMISSIONS.ANDROID.CAMERA);
//     let permission2 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//     let permission3 = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
//     if (permission1 == 'granted' && permission2 == 'granted' && permission3 == 'granted') {
//         return true;
//     } else {
//         return false;
//     }
// }

function _log(string) {
    console.log(string);
}

function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    }
    return false;
}

module.exports = {
   // images: images,
    colours: colours,
    _font: _font,
    _alert: _alert,
    _toast: _toast,
    _log: _log,
   // _permissions: _permissions,
    validateEmail: validateEmail,
    _truncateText: _truncateText,
    isIphoneXorAbove: isIphoneXorAbove,
    _encode: _encode,
    _get_chat_id: _get_chat_id,
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    //asset_url: 'http://localhost:3000/uploads/',
    //asset_url: 'http://167.99.187.184:3000/uploads/',
    //base_url: 'http://localhost:3000/',
    base_url: 'http://live.apexsecuritysystem.co.uk/api/',
};
