import { test, expect, Locator } from '@playwright/test';

test('Nick Award - VOTE for SB19', async ({ page }) => {
  test.setTimeout(24 * 60 * 60 * 1_000);
  const voteNowBtn = page.getByRole('link', { name: 'VOTE NOW!' });

  const thanksForVotingLabel = page.getByRole('heading', { name: 'THANKS FOR VOTING' })

  await page.goto('https://kca.nick-asia.com/');

  await voteNowBtn.click();

  const faveAsianActLabel = page.getByRole('heading', { name: 'Favourite Asian Act' });
  const SB19VoteButton = page.locator(`xpath=//span[contains(normalize-space(), 'SB19')]/../../../../div/parent::div`);

  while (true) {

    try {
      await expect(SB19VoteButton).toBeVisible({ timeout: 3_000});
      await SB19VoteButton.click({timeout: 3_000});
      await expect(SB19VoteButton).not.toBeVisible({ timeout: 3_000});
    } catch (error) {
      try {
        const lastItem = await page.locator(`div.question-option`).last();  
        await lastItem.click({ timeout: 1_000})
      } catch (error) {
        await page.locator(`//img[@alt="Vote Again"]/../../../button`).click();
      }
      
    }
    // const isFaveAsianActVisible = await isVisible(faveAsianActLabel);

    // if (isFaveAsianActVisible) {
    //   await page.waitForTimeout(5_000);
    //   await SB19VoteButton.click();
    //   await expect(SB19VoteButton).not.toBeVisible({timeout: 1_000});
    // } else {
    //   const isTYVisible = await isVisible(thanksForVotingLabel);
    //   if (isTYVisible) {
    //     await page.locator(`//img[@alt="Vote Again"]/../../../button`).click();
    //   } else {
    //     const firstItemVote = await page.locator(`div.question-option`).nth(0);
    //     await firstItemVote.click();
    //   }
    // }
  }
});

async function isVisible(el: Locator, timeout: number = 1_000) {

  try {
    await expect(el).toBeVisible({ timeout: timeout });
    console.log(`IS visible`);
    return true;
  } catch (error) {
    console.log(`NOT visible`);
    return false;
  }
}