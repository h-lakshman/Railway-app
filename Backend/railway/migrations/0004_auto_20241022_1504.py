from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('railway', '0003_ticket'),
    ]

    operations = [
        migrations.RunSQL(
            'INSERT INTO railway_ticket (pnr_number, people_count, user_id, train_id, date) '
            'VALUES (9121132457, 1, 1, 1, "2024-10-22");',
            reverse_sql='DELETE FROM railway_ticket WHERE pnr_number = 9121132457;'
        ),
        migrations.RunSQL(
            'UPDATE sqlite_sequence SET seq = 9121132457 WHERE name = "railway_ticket";'
        ),
    ]
