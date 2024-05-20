$(document).ready(function () {
    $('.render_from_template').each(function () {
        var $this = $(this);
        var templateId = $this.data('template_id'); // テンプレートのID
        var dataSourceName = $this.data('data_source'); // データの変数名

        // テンプレートの存在確認
        var template = $('#' + templateId);
        if (template.length === 0) {
            console.error("Template not found:", templateId); // テンプレートがない場合
            return; // 処理を中止
        }

        // データの存在確認
        var data = window[dataSourceName]; // グローバルスコープから変数を取得
        if (!data || !Array.isArray(data)) {
            console.error("Data source is invalid or not an array:", dataSourceName); // データがない場合
            return; // 処理を中止
        }

        // データの繰り返し
        data.forEach(function (item) {
            var $newElement = template.clone().removeAttr('id').show(); // テンプレートを複製

            // データのキーとクラス名に基づいて値を設定
            for (var key in item) {
                if (key.startsWith('img_')) {
                    var className = 'tpl' + key; // クラス名を生成
                } else {
                    var className = 'tplval_' + key; // クラス名を生成
                }

                var value = item[key];

                var $target = $newElement.find('.' + className); // ターゲットを取得

                if ($target.length === 0) { // ターゲットが見つからない場合
                    console.error(`Target object not found for key "${className}" in template "${templateId}".`); // エラーメッセージ
                    continue; // スキップ
                }

                if (key.startsWith('img_')) { // 'img_'で始まる場合
                    $target.attr('src', value); // 画像の場合
                    $target.attr('alt', value); // 画像の場合
                } else {
                    $target.text(value); // テキストの場合
                }
            }

            $this.append($newElement); // 新しい要素を追加
        });
    });
});
