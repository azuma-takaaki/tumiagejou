require 'rails_helper'

feature "CastleParts" , :js => true do
  before do
    visit "/"
    click_button "新規アカウント登録"
    fill_in "user_name", with:"test_user1"
    fill_in "email", with:"hogehoge1@hoge.com"
    fill_in "password", with:"password"
    fill_in "password_confirm", with:"password"
    click_button "登録"
    @castle_part_price0 = FactoryBot.create(:castle_part_price0)
    @castle_part_price1 = FactoryBot.create(:castle_part_price1)
  end


  example "castle_part_pointを使ってcastle_partを追加できる" do
    @group = FactoryBot.create(:programming)
    page.find('.side-menu-toggle').click
    click_on "グループを探す"
    find("input[placeholder='グループを探す']").set("progra")
    click_button "programming"
    find('div.bm-overlay').click
    click_button "城を建てる"
    fill_in "城の名前(目標)", with:"web開発エンジニアになる"
    find(".post-castle-data-button").click
    expect(page).to have_content "web開発エンジニアになる 城"

    page.find('.user-name', text: 'test_user1').click
    expect(page).to have_selector ".users-page-header-name", text: "test_user1"

    expect(page).to have_selector ".castle-point-at-user-page", text: "0"
    click_button "積み上げを登録する"
    fill_in "今日の積み上げ", with:"プログラミングを5時間勉強した！"
    click_button "登録する"
    expect(page).to have_selector ".castle-point-at-user-page", text: "1"
    expect(page).to have_selector ".report-content", text: "プログラミングを5時間勉強した！"


    page.find('.nav-link', text: '増築').click
    click_button ('城の門 必要ポイント: 1')
    click_button "3Dモデルを追加"
    click_button "城に追加する"
    expect(page).to have_selector ".castle-point-at-user-page", text: "0"

  end

  example "複数のcastle_partを一度にアップデートできる" do
    @group = FactoryBot.create(:programming)
    page.find('.side-menu-toggle').click
    click_on "グループを探す"
    find("input[placeholder='グループを探す']").set("progra")
    click_button "programming"
    find('div.bm-overlay').click
    click_button "城を建てる"
    fill_in "城の名前(目標)", with:"web開発エンジニアになる"
    find(".post-castle-data-button").click
    expect(page).to have_content "web開発エンジニアになる 城"

    page.find('.user-name', text: 'test_user1').click
    expect(page).to have_selector ".users-page-header-name", text: "test_user1"
    click_button "積み上げを登録する"
    fill_in "今日の積み上げ", with:"プログラミングを5時間勉強した！"
    click_button "登録する"
    expect(page).to have_selector ".report-content", text: "プログラミングを5時間勉強した！"
    page.find('.nav-link', text: '増築').click
    click_button ('城の門 必要ポイント: 1')
    click_button "3Dモデルを追加"
    click_button "城に追加する"
    page.find('.nav-link', text: '移動').click
    sleep 1
    click_button "変更を保存"
  end

  example "城の部品が削除でき, 城の部品を追加するために消費したcastle_part_pointが変換される" do
    @group = FactoryBot.create(:programming)
    page.find('.side-menu-toggle').click
    click_on "グループを探す"
    find("input[placeholder='グループを探す']").set("progra")
    click_button "programming"
    find('div.bm-overlay').click
    click_button "城を建てる"
    fill_in "城の名前(目標)", with:"web開発エンジニアになる"
    find(".post-castle-data-button").click
    expect(page).to have_content "web開発エンジニアになる 城"

    page.find('.user-name', text: 'test_user1').click
    expect(page).to have_selector ".users-page-header-name", text: "test_user1"

    expect(page).to have_selector ".castle-point-at-user-page", text: "0"
    click_button "積み上げを登録する"
    fill_in "今日の積み上げ", with:"プログラミングを5時間勉強した！"
    click_button "登録する"
    expect(page).to have_selector ".castle-point-at-user-page", text: "1"
    expect(page).to have_selector ".report-content", text: "プログラミングを5時間勉強した！"


    page.find('.nav-link', text: '増築').click
    click_button '城の門 必要ポイント: 1'
    click_button "3Dモデルを追加"
    click_button "城に追加する"
    expect(page).to have_selector ".castle-point-at-user-page", text: "0"

    page.find('.castle-point-at-user-page', text: '0')
    page.find('.nav-link', text: '削除').click
    click_button '選択中の城の部品を削除する'
    click_button "削除する"
    sleep 1
    page.find('.castle-point-at-user-page', text: '1')

  end


end
