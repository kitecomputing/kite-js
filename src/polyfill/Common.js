export function parseKiteAppUrl(url) {
    var url_obj

    try {
        url_obj = new URL(url);
    } catch (e) {
        if ( e instanceof TypeError ) {
            return { isKite: false }
        } else
            throw e
    }

    var host = url_obj.pathname;

    switch ( url_obj.protocol ) {
    case 'kite+app:':
        if ( host.startsWith('//') ) {
            var info = host.substr(2).split('/');
            if ( info.length >= 2 ) {
                return { isKite: true,
                         app: info[0],
                         path: '/' + info.slice(1).join('/') + url_obj.search,
                         port: 80 // TODO
                       };
            }
        }
        return { isKite: true, error: "Expected kite+app://app.domain/" };
    default:
        return { isKite: false };
    }
}

export function kiteAppCanonicalUrl( urlData ) {
    return 'kite+app://' + urlData.app;
}
