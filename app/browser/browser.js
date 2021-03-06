app_browser(pid);

function app_browser(_pid){
    if( System.args[_pid] && System.args[_pid].url ){
        $("#winc" + _pid +" #browser-frame").attr("src", System.args[_pid].url);
        $("#winc" + _pid +" #browser-url").val(System.args[_pid].url);
    }

    if( localStorage["kit-default-browser"] != "browser" ){
        $("#winc" + _pid +" .browser-message").show();
    }

    $("#winc" + _pid + " #browser-message-close").on("click", function(){
        $("#winc" + _pid +" .browser-message").hide();
    });

    $("#winc" + _pid + " .browser-bars").on("click", function(){
        $("#winc" + _pid +" .browser-menu").toggle();
    });

    $("#winc" + _pid +" #browser-url").keypress(function(e){
        if( e.which == 13 ){
            $("#winc" + _pid +" #browser-frame").attr("src", $("#winc" + _pid +" #browser-url").val());
        }
    });

    S.resizable( _pid, "#browser-frame", 200 );

    S.dom( _pid, "#browser-menu-reload").on("click", function(){
        S.dom( _pid, "#browser-frame" )[0].contentDocument.location.reload(true);
    });

    $("#winc" + _pid + " #browser-menu-bookmark").on("click", function(){
        $("#winc" + _pid +" #browser-frame").attr("src", "./app/browser/bookmark.html");
        $("#winc" + _pid +" .browser-menu").hide();
    });

    $("#winc" + _pid + " #browser-menu-default").on("click", function(){
        if( localStorage["kit-default-browser"] == "browser" ){
            System.alert("設定済み", "ブラウザは既にkitの標準ブラウザに設定されています。");
        }
        else{
            localStorage.setItem("kit-default-browser", "browser");
            System.alert("設定しました", "ブラウザをkitの標準ブラウザに設定しました。");
        }
    });

    $("#winc" + _pid + " #browser-menu-designmode").on("click", function(){
        let _ifr = System.qs(_pid, 'iframe')[0];
        try {
            if( _ifr.contentDocument.designMode == "on" ){
                _ifr.contentDocument.designMode = "off";
            }
            else _ifr.contentDocument.designMode = "on";
        } catch (error) {
            Notification.push('DesignMode切り替えに失敗', error, 'browser');
        }
        $("#winc" + _pid +" .browser-menu").hide();
    });
}