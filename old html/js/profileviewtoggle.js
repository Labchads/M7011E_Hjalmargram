var img = document.getElementsByClassName("imgposts")[0];
            var vids = document.getElementsByClassName("noposts")[0];
            var txts = document.getElementsByClassName("textposts")[0];

            function showImgs()
            {
                toggle(img);
            }

            function showEmpty()
            {
                toggle(vids);
            }

            function showTxts()
            {
                toggle(txts);
            }

            function toggle(act)
            {
                img.style.display = "none";
                vids.style.display = "none";
                txts.style.display = "none";
                act.style.display = "grid";
            }

            showImgs();